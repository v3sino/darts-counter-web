import { Timestamp } from "firebase/firestore"

export type Game = {
    gameState: {
        currentPlayer: number,
        legEnded: boolean,
        visits: Array<Array<string>>
    },
    playerUIDs: Array<string>,
    startedAt: Timestamp
}