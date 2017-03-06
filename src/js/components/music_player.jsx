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
    this.audioReady = this.audioReady.bind(this);
    this.goToNextSong = this.goToNextSong.bind(this);
    this.goToPreviousSong = this.goToPreviousSong.bind(this);
  }

  componentDidMount() {
    if (this.validSongs().length) this.updateSongInfo();

    const audioElement = this.getAudioTag();
    audioElement.addEventListener('canplay', this.audioReady);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.files.length && this.props.files.length) this.updateSongInfo();
  }

  componentWillUnmount() {
    const audioElement = this.getAudioTag();
    audioElement.removeEventListener('canplay', this.audioReady);
  }

  getAudioTag() {
    return this.audio;
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

  goToSongIndex(index) {
    this.setState({
      currentSongIndex: index,
      currentSongInfo: {},
      isReady: false,
    });
    this.updateSongInfo();
  }

  goToNextSong() {
    this.goToSongIndex(++this.state.currentSongIndex);
  }

  goToPreviousSong() {
    this.goToSongIndex(--this.state.currentSongIndex);
  }

  audioReady() {
    this.setState({ isReady: true });
  }

  renderAudioTag() {
    let src = '';
    if (this.state.currentSongInfo.link) {
      src = this.state.currentSongInfo.link;
    }
    return (
      <audio src={src} ref={(c) => { this.audio = c; }} />
    );
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

  renderPlayButton() {
    const text = this.state.isPlaying ? 'Pause' : 'Play';
    return (
      <button className="btn" onClick={this.togglePlay} disabled={!this.state.isReady}>
        {text}
      </button>
    );
  }

  renderControls() {
    return (
      <div>
        <button className="btn" onClick={this.goToPreviousSong}>Previous</button>
        {this.renderPlayButton()}
        <button className="btn" onClick={this.goToNextSong}>Next</button>
      </div>
    );
  }

  renderFiles() {
    return this.props.files.map((file, index) => {
      if (index === this.state.currentSongIndex) {
        return <div><b>{file.name}</b></div>;
      }
      return <div>{file.name}</div>;
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="container page-center text-center">
        {this.renderAudioTag()}
        {this.renderTitle()}
        {this.renderRadio()}
        {this.renderControls()}
        {this.renderFiles()}
      </div>
    );
  }
}

MusicPlayer.propTypes = {
  files: React.PropTypes.array,
  dbx: React.PropTypes.object.isRequired,
};
