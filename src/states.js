import { atom } from "recoil"

export const booksState = atom({
	key: "books",
	default: [],
})
