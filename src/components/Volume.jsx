import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { useState } from "react";

export default function Volume() {
    const [{token}]=useStateProvider();

    const setVolume = async (e) => {
        await axios.put(`https://api.spotify.com/v1/me/player/volume`, {}, {
            params: { volume_percent:parseInt(e.target.value) },

            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        });
    }

    const [value, setValue] = useState(0);
    const MAX = 100;
    const getBackgroundSize = () => {
        return {
            backgroundSize: `${(value * 100) / MAX}% 100%`,
        };
    };

    return(
        <Container>
            <input type="range" min="0" max={MAX} onMouseUp={(e)=>setVolume(e)} onChange={(e) => setValue(e.target.value)} style={getBackgroundSize()} value={value} />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    input[type='range'] {
        -webkit-appearance: none;
        width: 12rem;
        height: 0.25rem;
        background: grey;
        border-radius: 2rem;
        background-image: linear-gradient(#20e21a, #20e21a);
        background-repeat: no-repeat;
    }

    input[type='range']::-webkit-slider-thumb {
	-webkit-appearance: none;
	height: 15px;
	width: 15px;
	border-radius: 50%;
	background: #fff;
	cursor: pointer;
	box-shadow: 0 0 2px 0 #555;
    }      

    input[type='range']::-webkit-slider-runnable-track {
	-webkit-appearance: none;
	box-shadow: none;
	border: none;
	background: transparent;
    }
`