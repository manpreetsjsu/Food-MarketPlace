import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import Modal from '../ItemClickModal/ItemClickModal'



const CardExampleCardProps = (props) => (
    <Modal img={props.img} header={props.header} info={props.info} extraInfo={props.extraInfo}>
    <Card onClick={props.click}>
        <Image src={props.img} />
        <Card.Content>
            <Card.Header>{props.header}</Card.Header>
            <Card.Meta>
                <span className='date'>{props.timeStamp}</span>
            </Card.Meta>
            <Card.Description>{props.info}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
                22 Friends
            </a>
        </Card.Content>
    </Card>
    </Modal>
)

export default CardExampleCardProps