import React from 'react';
import { List, Statistic, Image, Icon, Button, Item } from 'semantic-ui-react'
import './About.css';

const About = () => (
	<div className="about-root">
		<div className="about-project">
			<h1>About CityNight</h1>
			<List inverted relaxed size="medium" className="about-project-list">
		      <List.Item>
		        <List.Content className="about-project-desc">
		          <List.Header className="about-project-desc-header">Project Purpose </List.Header>
		          <p>This is a freeCodeCamp full-stack project, following the instruction of  
		          <a className="about-link" href="https://www.freecodecamp.com/challenges/build-a-nightlife-coordination-app"> "Basejump: Build a Nightlife Coordination App | Free Code Camp"</a>
		          </p>
		          <ul>
		          The project fullfills the following user stories: 
		           	  <List.List>
				        <List.Item as='li'>As an unauthenticated user, I can view all bars in my area.</List.Item>
				        <List.Item as='li'>As an authenticated user, I can add myself to a bar to indicate I am going there tonight.</List.Item>
				        <List.Item as='li'> As an authenticated user, I can remove myself from a bar if I no longer want to go there.</List.Item>
				        <List.Item as='li'>As an unauthenticated user, when I login I should not have to search again.</List.Item>
				      </List.List>
				  </ul>
		        </List.Content>
		      </List.Item>
		      <List.Item>
		        <List.Content>
		          <List.Header>Tech Stack, UI Lib, and External Api</List.Header>
		          <Statistic inverted >
				      <Statistic.Value>
				        <Image src='./images/react-logo.png' inline/>
				      </Statistic.Value>
				      <Statistic.Label>React</Statistic.Label>
				  </Statistic>
				  <Statistic inverted >
				      <Statistic.Value>
				        <Image src='./images/redux-logo.png' inline/>
				      </Statistic.Value>
				      <Statistic.Label>Redux</Statistic.Label>
				  </Statistic>
				  <Statistic inverted>
				      <Statistic.Value>
				        <Image src='./images/node-logo.png' inline/>
				        {' '}
				        <Image src='./images/express-logo.png' inline/>
				      </Statistic.Value>
				      <Statistic.Label>Node.js & Express</Statistic.Label>
				  </Statistic>
				  <Statistic inverted >
				      <Statistic.Value>
				        <Image src='./images/mongo-logo.png' inline/>
				      </Statistic.Value>
				      <Statistic.Label>MongoDB</Statistic.Label>
				  </Statistic>
				  <Statistic inverted >
				      <Statistic.Value>
				        <Image src='./images/semantic-logo.png' inline/>
				      </Statistic.Value>
				      <Statistic.Label>Semantic UI React</Statistic.Label>
				  </Statistic>
				  <Statistic inverted >
				      <Statistic.Value>
				        <Image src='./images/yelp-logo.png' inline/>
				      </Statistic.Value>
				      <Statistic.Label>Yelp Fusion</Statistic.Label>
				  </Statistic>
		        </List.Content>
		      </List.Item>
		    </List>
		</div>
		<div className="about-author">
			<h1>About Jia Guo</h1>
			<Item.Group>
			    <Item>
			      <Item.Image src='./images/jia_guo.jpg' size='small' shape='circular' />

			      <Item.Content>
			        <Item.Header>A web developer based in Palo Alto, CA</Item.Header>
			        <Item.Meta className="about-author-icon">
			        	<span className="about-author-icon-text"> Get in touch with me </span>
			        	<Button circular as="a" color='black' icon='github alternate' href="https://github.com/antipasjiajia" />
						<Button circular as="a" color='black' icon='linkedin' href="https://www.linkedin.com/in/jia-guo-40921642/?trk=nav_responsive_tab_profile_pic" />
					    <Button circular as="a" color='black' icon='codepen' href="https://codepen.io/antipasjiajia/" />
					    <Button circular as="a" color='black' icon='free code camp' href="https://www.freecodecamp.com/antipasjiajia" />
			        </Item.Meta>
			        <Item.Extra className="about-author-link">
			        	<span className="about-author-link-text">View my portfolio at </span>
			            <a href="https://antipasjiajia.github.io/">https://antipasjiajia.github.io/</a>
			        </Item.Extra>
			      </Item.Content>
			    </Item>
		    </Item.Group>
		</div>
	</div>
)

export default About;