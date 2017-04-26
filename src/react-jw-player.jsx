import React, { Component } from 'react';

import createEventHandlers from './create-event-handlers';
import getPlayerOpts from './helpers/get-player-opts';
import initialize from './helpers/initialize';

import defaultProps from './default-props';
import propTypes from './prop-types';

const displayName = 'ReactJWPlayer';

import jquery from 'jquery';
import jwplayer from './jwplayer.js';

class ReactJWPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adHasPlayed: false,
      hasPlayed: false,
      hasFired: {},
    };
    this.eventHandlers = createEventHandlers(this);
    window.jwplayer = jwplayer;
    this._initialize = this._initialize.bind(this);
  }
  componentDidMount() {
    this._initialize();
  }
  _initialize() {
    const component = this;
    const player = window.jwplayer(this.props.playerId);
    const playerOpts = getPlayerOpts(this.props);
    this.setState({player: player});
    initialize({ component, player, playerOpts });
  }

  componentWillReceiveProps(newProps){
    let oldSources = getPlayerOpts(this.props).sources;
    let newSources = getPlayerOpts(newProps).sources;
    if ( JSON.stringify(oldSources) != JSON.stringify(newSources) ){
      const component = this;
      const player = this.state.player;
      const playerOpts = getPlayerOpts(newProps);
      initialize({ component, player, playerOpts })
    }
  }

  render() {
    return (
      <div className={this.props.className} id={this.props.playerId} />
    );
  }
}

ReactJWPlayer.defaultProps = defaultProps;
ReactJWPlayer.displayName = displayName;
ReactJWPlayer.propTypes = propTypes;
export default ReactJWPlayer;
