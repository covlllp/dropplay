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
    };
  }

  componentDidMount() {
    if (this.validSongs().length) this.updateSongInfo();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.files.length && this.props.files.length) this.updateSongInfo();
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

  renderAudioTag() {
    if (this.state.currentSongInfo.link) {
      return <audio src={this.state.currentSongInfo.link} controls autoPlay />;
    }
    return null;
  }

  renderFiles() {
    return this.props.files.map((file) => <div>{file.name}</div>);
  }

  render() {
    return (
      <div>
        {this.renderAudioTag()}
        {this.renderFiles()}
      </div>
    );
  }
}

MusicPlayer.propTypes = {
  files: React.PropTypes.array,
  dbx: React.PropTypes.object.isRequired,
};
