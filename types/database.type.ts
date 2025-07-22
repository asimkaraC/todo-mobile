import { Timestamp } from "firebase/firestore";

export interface Task {
    id: string;
    description: string;
    deadline: Timestamp;
    done: boolean;
    archived: boolean;
}

 