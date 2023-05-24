import styled, { css } from "styled-components"

export const Row = styled.div`
	display: flex;
	align-items: center;

	${props => props.center && css`
		justify-content: center;
	`}
`

export const FlexGrow = styled.div`
	flex-grow: 1;
`

export const Block = styled.div`
	height: 50px;
	background: teal;
`

export const Space = styled.div`
	height: ${prop => prop.h || 0};
	width: ${prop => prop.w || 0};

	@media screen and (max-width: 64em) {
		height: ${prop => prop.mh || prop.h || 0};
		width: ${prop => prop.mw || prop.w || 0}
	}
`
