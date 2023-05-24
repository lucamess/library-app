import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Fuse from "fuse.js"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { Button, Input, Space, Row, Checkbox, BookCard } from "comp"
import { booksState } from "src/states"
import { routePathList } from "src/config"
import { daysFromToday } from "src/utils"


const Home = () => {
	const navigate = useNavigate()
	const [ searchText, setSearchText ] = useState("")
	const [ books, setBooks ] = useRecoilState(booksState)
	const [ resBooks, setResBooks ] = useState(books)
	const [ isIssued, setIssued] = useState(false)
	const [ isLate, setLate ] = useState(false)

	const handleClick = book => () => {
		navigate(routePathList.viewBook, { state: book })
	}

	console.log("books", books, isIssued, isLate)

	useEffect(() => {
		const storedBooks = JSON.parse(localStorage.getItem("books") || 0) || []
		setBooks(storedBooks)
		setResBooks(storedBooks)
	}, [])

	useEffect(() => {
		const fuse = new Fuse(books, {
			keys: ["title", "author", "issuedName", "issuedClass"]
		})

		let resBooksTemp
		if(searchText.replace(" ", "") == "")
			resBooksTemp = books
		else
			resBooksTemp = fuse.search(searchText)

		if(isIssued) {
			resBooksTemp = resBooksTemp.filter(book => Boolean(book.issuedName))
		}

		if(isLate) {
			resBooksTemp = resBooksTemp.filter(book => daysFromToday(book.issueDate) > 4)
		}

		setResBooks(resBooksTemp)

	}, [ searchText, isIssued, isLate, books ])

	return (
		<Container>
			<h1>Search for books and students</h1>
			<h4>(created by 12D students)</h4>
			<Button size="small" style={{ alignSelf: "flex-end" }}
				onClick={() => navigate(routePathList.addBook)}>
				Add book
			</Button>
			<Space h="1rem" />
			<Input value={searchText} onChange={e => setSearchText(e.target.value)}
				placeholder="Search anything here" />
			<Space h="0.5rem" />
			<Row style={{ gap: "1rem" }}>
				<Checkbox label="Issued" onChange={setIssued} />
				<Checkbox label="Late" onChange={setLate} />
			</Row>

			<Space h="1rem" />
			{resBooks.length == 0 ? <Nothing>No books registered, add some!</Nothing> :
				books.map(book =>
				<BookCard key={book.bookId} book={book}
					onClick={handleClick(book)} />)
			}

		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 600px;
	margin: 0 auto;
	padding: 2rem;
`

const Nothing = styled.div`
	margin: 2rem;
	color: var(--primary);
	font-size: 1.6rem;
	text-align: center;
`

export default Home
