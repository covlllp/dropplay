import React from 'react';

const VALID_AUDIO_TYPES = [
  '.wav',
  '.mp3',
];

export default class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSongIndex: 0,
      currentSongInfo: {},
      isPlaying: false,
      isReady: false,
    };

    this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    if (this.validSongs().length) this.updateSongInfo();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.files.length && this.props.files.length) this.updateSongInfo();
  }

  getAudioTag() {
    return this.refs.audio;
  }

  getSongLink() {
    return new Promise((resolve, reject) => {
      const validSongs = this.validSongs();
      if (!validSongs.length) reject('no songs');
      const song = validSongs[this.state.currentSongIndex];
      this.props.dbx.filesGetTemporaryLink({ path: song.path_lower })
      .then((res) => {
        resolve({
          link: res.link,
          name: res.metadata.name,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  updateSongInfo() {
    this.getSongLink().then((song) => {
      this.setState({ currentSongInfo: song });
    });
  }

  validSongs() {
    return this.props.files.filter((file) => {
      const lastIndex = file.name.lastIndexOf('.');
      const fileExtension = file.name.substring(lastIndex);
      return VALID_AUDIO_TYPES.indexOf(fileExtension) !== -1;
    });
  }

  playSong() {
    this.getAudioTag().play();
    this.setState({ isPlaying: true });
  }

  pauseSong() {
    this.getAudioTag().pause();
    this.setState({ isPlaying: false });
  }

  togglePlay() {
    if (this.state.isPlaying) this.pauseSong();
    else this.playSong();
  }

  renderAudioTag() {
    if (this.state.currentSongInfo.link) {
      if (this.state.isReady) return <audio src={this.state.currentSongInfo.link} ref="audio" />;
      return <audio src={this.state.currentSongInfo.link} ref="audio" disabled />;
    }
    return null;
  }

  renderTitle() {
    return (
      <h2 className="sub-title">
        {this.state.currentSongInfo.name}
      </h2>
    );
  }

  renderRadio() {
    return (
      <p>
        <img src="images/radio.png" alt="radio" />
      </p>
    );
  }

  renderControls() {
    return (
      <button className="btn" onClick={this.togglePlay}>Toggle</button>
    );
  }

  renderFiles() {
    return this.props.files.map((file) => <div>{file.name}</div>);
  }

  render() {
    return (
      <div className="container page-center text-center">
        {this.renderAudioTag()}
        {this.renderTitle()}
        {this.renderRadio()}
        {this.renderControls()}
      </div>
    );
  }
}

MusicPlayer.propTypes = {
  files: React.PropTypes.array,
  dbx: React.PropTypes.object.isRequired,
};
