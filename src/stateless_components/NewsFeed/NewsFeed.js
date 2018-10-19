import React from 'react'
import { Feed, Icon,Header } from 'semantic-ui-react'


const style={
    position:'relative',
    width:'60%',
    left:'20%',
    border:'1px solid lightGrey',
    borderRadius: '5px',
    padding:'0px 5px 20px 35px',
    marginTop:'20px'
};

const NewsFeed = () =>
    (
        <div style={style}>
            <Feed size='large'>
                <Feed.Event
                    image= {require('../../assets/images/logo.png')}
                    content='You added Elliot Fu to the group Coworkers'
                />

                <Feed.Event>
                    <Feed.Label image={require('../../assets/images/fruits.jpg')} />
                    <Feed.Content content='You added Elliot Fu to the group Coworkers' />
                </Feed.Event>

                <Feed.Event>
                    <Feed.Label>
                        <Icon name='pencil' />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Date>Today</Feed.Date>
                        <Feed.Summary>
                            You posted on your friend <a>Stevie Feliciano's</a> wall.
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                    <Feed.Label>
                        <img alt='' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>
                            You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                            <Feed.Date>3 days ago</Feed.Date>
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                    <Feed.Label image='/images/avatar/small/helen.jpg' />
                    <Feed.Content>
                        <Feed.Date>3 days ago</Feed.Date>
                        <Feed.Summary>
                            <a>Helen Troy</a> added 2 photos
                        </Feed.Summary>
                        <Feed.Extra images>
                            <a>
                                <img alt='' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                            </a>
                            <a>
                                <img alt='' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                            </a>
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                    <Feed.Label image='/images/avatar/small/laura.jpg' />
                    <Feed.Content>
                        <Feed.Date>3 days ago</Feed.Date>
                        <Feed.Summary>
                            <a>Laura Faucet</a> created a post
                        </Feed.Summary>
                        <Feed.Extra text>Have you seen what's going on in Israel? Can you believe it.</Feed.Extra>
                    </Feed.Content>
                </Feed.Event>

                <Header as='h4'>Followers Activity</Header>

                <Feed.Event>
                    <Feed.Content>
                        <Feed.Summary>
                            <a>Elliot Fu</a> added <a>Jenny Hess</a> as a friend
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                    <Feed.Content>
                        <Feed.Summary>
                            <a>Stevie Feliciano</a> added <a>Elliot Fu</a> as a friend
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                    <Feed.Content>
                        <Feed.Summary>
                            <a>Helen Troy</a> added <a>Christian Rocha</a> as a friend
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                    <Feed.Content>
                        <Feed.Summary>
                            <a>Christian Rocha</a> signed up for the site.
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                    <Feed.Label image='/images/avatar/small/elliot.jpg' />
                    <Feed.Content>
                        <Feed.Summary>
                            <Feed.User>Elliot Fu</Feed.User> added you as a friend
                            <Feed.Date>1 Hour Ago</Feed.Date>
                        </Feed.Summary>
                        <Feed.Meta>
                            <Feed.Like>
                                <Icon name='like' />
                                4 Likes
                            </Feed.Like>
                        </Feed.Meta>
                    </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                    <Feed.Label icon='pencil' />
                    <Feed.Content>
                        <Feed.Summary>
                            You submitted a new post to the page
                            <Feed.Date>3 days ago</Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra text>I'm having a BBQ this weekend. Come by around 4pm if you can.</Feed.Extra>
                        <Feed.Meta>
                            <Feed.Like>11 Likes</Feed.Like>
                        </Feed.Meta>
                    </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                    <Feed.Label image='/images/avatar/small/helen.jpg' />
                    <Feed.Content>
                        <Feed.Date>4 days ago</Feed.Date>
                        <Feed.Summary>
                            <a>Helen Troy</a> added <a>2 new illustrations</a>
                        </Feed.Summary>

                        <Feed.Extra images>
                            <a>
                                <img alt="" src='https://react.semantic-ui.com/images/wireframe/image.png' />
                            </a>
                            <a>
                                <img alt="" src='https://react.semantic-ui.com/images/wireframe/image.png' />
                            </a>
                        </Feed.Extra>

                        <Feed.Meta like='1 Like' />
                    </Feed.Content>
                </Feed.Event>

            </Feed>
        </div>
    );

export default NewsFeed;
