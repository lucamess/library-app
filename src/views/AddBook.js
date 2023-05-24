import React, { useState } from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { Input, Space, Button } from "comp"
import { booksState } from "src/states"
import { routePathList } from "src/config"

const initEdBook = {
	bookId: "", title: "", author: "", audience: "",
}

const AddBook = () => {
	const navigate = useNavigate()
	const [, setBooks] = useRecoilState(booksState)
	const [edBook, setEdBook] = useState(initEdBook)

	const handleInput = key => e => {
		setEdBook(book => ({
			...book,
			[key]: e.target.value
		}))
	}
	const handleSave = () => {
		setBooks(oldBooks => {
			const newBooks = [
				...oldBooks,
				edBook
			]

			localStorage.setItem("books", JSON.stringify(newBooks))
			return newBooks
		})
		toast.success("Book added to the database")
		setEdBook(initEdBook)
	}

	return (
		<Container>
			<Button onClick={() => navigate(routePathList.home)}
				type="text" style={{ width: "min-content" }}>{"<-Back"}</Button>
			<Title>Add a new book</Title>
			<Space h="2rem" />

			<Input value={edBook.title} onChange={handleInput("title")}
				placeholder="Book title" />
			<Space h="1rem" />
			<Input value={edBook.bookId} onChange={handleInput("bookId")}
				placeholder="Book Identification Number" />
			<Space h="1rem" />
			<Input value={edBook.author} onChange={handleInput("author")}
				placeholder="Author" />
			<Space h="1rem" />
			<Input value={edBook.audience} onChange={handleInput("audience")}
				placeholder="Intended for" />

			<Space h="2rem" />
			<Button onClick={handleSave} width="min-content" style={{ alignSelf: "flex-end" }}>
				Add
			</Button>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	width: 600px;
	margin: 0 auto;
`

const Title = styled.div`
	font-size: 2rem;
	color: #363636;
	font-weight: bold;
`

export default AddBook

