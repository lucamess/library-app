import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { RecoilRoot } from "recoil"
import { colors, routePathList } from "./config"

import Home from "src/views/Home"
import ViewBook from "src/views/ViewBook"
import AddBook from "src/views/AddBook"

const GlobalStyle = createGlobalStyle`
	:root {
		--primary: ${props => props.theme.primary};
	}

	body {
		padding: 0;
		margin: 0;
		border: 0;
		outline: 0;
		// background: #f0f0ff;
	}

	* {
		box-sizing: border-box;
		font-family: sans-serif;
	}
`

const App = () => {
	return (
		<RecoilRoot>
		<ThemeProvider theme={colors}>
		<HashRouter>
			<GlobalStyle />
			<Toaster />
			<Routes>
				<Route path={routePathList.home}
					element={<Home />} exact />
				<Route path={routePathList.viewBook}
					element={<ViewBook />} />
				<Route path={routePathList.addBook}
					element={<AddBook />} />
			</Routes>
		</HashRouter>
		</ThemeProvider>
		</RecoilRoot>
	)
}

export default App
