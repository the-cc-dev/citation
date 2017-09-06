import React from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';

import renderOnResize from '../../logic/hocs/renderOnResize';

const MainMenuIndicatorContainer = styled.div`
	position: absolute;
	top: 0;
	height: 100%;
	left: ${({ left }) => left}px;
	width: ${({ width }) => width}px;
	border-bottom: .2rem solid ${({ color }) => color};
	border-top: .2rem solid ${({ color }) => color};
	z-index: -1;
	transition: all .5s ease;
`;

const active = items => {
	const activeItems = items.filter(item => item.match !== null);
	if (activeItems.length > 0) {
		return activeItems[0];
	}
	return null;
};

const enhancer = renderOnResize;

const MainMenuIndicator = ({ items }) => {
	const item = active(items);
	if (item !== null && item.node !== null) {
		const node = item.node;
		const color = item.menu.props.color;
		const rect = node.getBoundingClientRect();
		return <MainMenuIndicatorContainer left={rect.left} width={rect.width} color={color} />;
	}
	return null;
};

MainMenuIndicator.propTypes = {
	items: array
};

export default enhancer(MainMenuIndicator);
