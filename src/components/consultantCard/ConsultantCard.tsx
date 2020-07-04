import React from 'react'
import {Ava, CardWrapper, ConnectButton, Description, Specialization, Star} from "./CardStyled";
import star from '../../img/star.png'

type OwnProps = {
    url: string | null
    name: string
    last_name: string
    description: string
}

const ConsultantCard: React.FC<OwnProps> = (props) => {
    return (
        <CardWrapper>
            <Ava>
                <img
                    width={'100%'}
                    height={'100%'}
                    src={
                        props.url !== null ? props.url : "https://thumbs.dreamstime.com/b/young-man-agronom-checking-state-vegetables-tomatoes-tablet-greenhouse-men-agriculture-96553509.jpg"
                    }
                    alt="#"/>
            </Ava>
            <Star>
                4.4
                <img src={star} alt="star"/>
            </Star>
            <h2>{props.name} {props.last_name}</h2>

            <Description>
                {props.description ? props.description : 'Нет описания'}
            </Description>

            <hr/>

            <p>
                <Specialization>
                    Специализация:
                </Specialization>
                <span>
                    Культура, Органика, Инновации, Культура, Органика, Инновации
                </span>
            </p>
            <ConnectButton>
                Связаться
            </ConnectButton>
        </CardWrapper>
    )
}


export default ConsultantCard
