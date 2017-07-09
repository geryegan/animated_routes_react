import React, { Component } from "react";
import * as Animated from "animated/lib/targets/react-dom";

export default class ProjectItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: {},
			animate: new Animated.Value(0)
		};
	}
	componentDidMount() {
		if (this.props.projects.length) {
			this._renderProject(this.props.projects);
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!this.props.projects.length && nextProps.projects.length) {
			this._renderProject(nextProps.projects);
		}
	}
	_renderProject(projects) {
		let project = projects.filter(p => {
			//id from router 
			return (p.id = this.props.match.params.id);
		});
		//if there exists a project with the matching id, setstate with project info
		if (project.length) {
			this.setState({ project: project[0] });
			//then, animate
			setTimeout(
				//callback
				() =>
					Animated.spring(this.state.animate, { toValue: 1 }).start(),
				//milliseconds
				375
			);
		}
	}
	render() {
		//destructure title and body off of state
		const { project: { title, body } } = this.state;
		//back button animation
		const goBackStyle = {
			transform: Animated.template`
				translate3d(${this.state.animate.interpolate({
				inputRange: [0, 1],
				outputRange: ["-24px", "0px"]
			})},0,0)
			`,
			opacity: Animated.template`${this.state.animate}`
		};
		return (
			<div className="page project-item">
				<Animated.span style={goBackStyle} className="goBack">
					<a
						onClick={e => {
							e.preventDefault();
							this.props.history.goBack();
						}}
					>
						←
					</a>
				</Animated.span>
				<h1>{title && title}</h1>
				<p>{body && body}</p>
			</div>
		);
	}
}
