import React from "react";
import styled from "styled-components";
import { Button, CloseableContainer, Gold } from "./common";
import {Layers} from "../../../types";
import {VoxelCoord} from "@latticexyz/utils";
import {getComponentValue} from "@latticexyz/recs";
import {toast} from "react-toastify";

export const RegisterCreation: React.FC<{ onClose: () => void; layers: Layers}> = ({ onClose, layers }) => {
	const {
		network: {
			api,
		},
		noa: {
			components: { VoxelSelection },
			SingletonEntity,
		},
	} = layers;

	const submit = (creationId: number) => {
		let points: VoxelCoord[] = getComponentValue(VoxelSelection, SingletonEntity)?.points ?? [];
		// only take the last 4 points to submit the test
		points = points.slice(-4);
		if(points.length < 4) {
			toast("Please select at least 4 points to submit the adder test.")
			return;
		}

		api.submitHalfAdderTest(creationId, points);
	}

	return (
		<ImportContainer onClose={onClose}>
			<p>
				<Gold>Submit Adder Test</Gold>
			</p>
			<Buttons>
				<Button onClick={submit}>Submit</Button>
			</Buttons>
		</ImportContainer>
	);
};

const ImportContainer = styled(CloseableContainer)`
  line-height: 1;
  pointer-events: all;
  min-width: 200px;
`;

const Buttons = styled.div`
  margin-top: 8px;
  display: grid;
  grid-gap: 9px;
  grid-auto-flow: column;
`;