import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { store } from "../api/main/appStore";
import { backendUrl } from "../urls";
import {
  Election,
  Contest,
  ContestResult,
  VoteCastEvent,
  PublishedResultsModel,
} from "../api/models/election";

// SignalR connection manager for elections

let connection: HubConnection | null = null;
let currentElectionId: string | null = null;

const getSignalRUrl = () => {
  // Derive hub URL from API base URL
  const baseUrl = backendUrl.replace("/api/v1", "");
  return `${baseUrl}/hubs/elections`;
};

export const connectToElectionHub = async (electionId: string) => {
  try {
    // Disconnect any existing connection first
    if (connection) {
      await disconnectFromElectionHub();
    }

    currentElectionId = electionId;

    connection = new HubConnectionBuilder()
      .withUrl(getSignalRUrl(), {
        accessTokenFactory: () => store.commonStore.token || "",
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(LogLevel.Information)
      .build();

    // Register event handlers
    connection.on("ElectionUpdated", (election: Election) => {
      store.electionStore.handleElectionUpdated(election);
    });

    connection.on("VoteCast", (data: VoteCastEvent) => {
      store.electionStore.handleVoteCast(data);
    });

    connection.on("ResultsPublished", (results: PublishedResultsModel) => {
      store.electionStore.handleResultsPublished(results);
    });

    // Real-time contest added to live election
    connection.on("ContestCreated", (contest: Contest) => {
      store.electionStore.handleContestCreated(contest);
    });

    // Real-time single contest results published
    connection.on("ContestResultsPublished", (result: ContestResult) => {
      store.electionStore.handleContestResultsPublished(result);
    });

    // Re-join election group after automatic reconnect
    connection.onreconnected(async () => {
      console.log("SignalR reconnected");
      if (currentElectionId && connection?.state === HubConnectionState.Connected) {
        try {
          await connection.invoke("JoinElection", currentElectionId);
          console.log(`Re-joined election: ${currentElectionId}`);
        } catch (err) {
          console.error("Failed to re-join election after reconnect:", err);
        }
      }
    });

    connection.onreconnecting((error) => {
      console.warn("SignalR reconnecting...", error);
    });

    connection.onclose((error) => {
      console.warn("SignalR connection closed", error);
      connection = null;
    });

    await connection.start();

    // Join the election room
    await connection.invoke("JoinElection", electionId);

    console.log(`Connected to election hub for election: ${electionId}`);
  } catch (error) {
    console.error("Failed to connect to election hub:", error);
    connection = null;
  }
};

export const disconnectFromElectionHub = async () => {
  try {
    if (connection) {
      if (connection.state === HubConnectionState.Connected && currentElectionId) {
        try {
          await connection.invoke("LeaveElection", currentElectionId);
        } catch {
          // Ignore leave errors during disconnect
        }
      }
      await connection.stop();
      connection = null;
      currentElectionId = null;
    }
  } catch (error) {
    console.error("Failed to disconnect from election hub:", error);
    connection = null;
    currentElectionId = null;
  }
};

export const joinElection = async (electionId: string) => {
  try {
    if (connection && connection.state === HubConnectionState.Connected) {
      currentElectionId = electionId;
      await connection.invoke("JoinElection", electionId);
    }
  } catch (error) {
    console.error("Failed to join election:", error);
  }
};

export const leaveElection = async (electionId: string) => {
  try {
    if (connection && connection.state === HubConnectionState.Connected) {
      await connection.invoke("LeaveElection", electionId);
      currentElectionId = null;
    }
  } catch (error) {
    console.error("Failed to leave election:", error);
  }
};
