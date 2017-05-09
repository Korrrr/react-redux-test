import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { GridList, GridTile } from 'material-ui/GridList';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

class DropZone extends Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);

    this.state = {
      files: [],
    };

    this.styles = {
      dropzone: {
        margin: '16px',
        padding: '12px',
        minHeight: '240px',
        backgroundColor: '#eee',
        border: '3px dashed #777',
        borderRadius: '8px',
        textAlign: 'center',
      },
      span: {
        color: 'blue',
      },
    };
  }

  onDrop(files) {
    // hardcode show progress
    files.map(file => file.completed = Math.floor(Math.random() * 3) * 50);

    this.setState({
      files: this.state.files.concat(files),
    });
  }

  renderImg() {
    return this.state.files.map((f, i) => {
      return (
        <GridTile
          key={i}
        >
          <Card>
            <CardMedia>
              <img src={f.preview} height={120} />
            </CardMedia>
            <CardText>
              { f.completed === 0 ? 'wait...' :
                f.completed === 100 ? f.name :
                <LinearProgress
                  mode="determinate"
                  value={f.completed}
                  style={{ height: '16px' }}
                />}
            </CardText>
          </Card>
        </GridTile>
      );
    });
  }

  render() {
    let dropzoneRef;
    return (
      <div>
        <Dropzone
          accept="image/jpeg, image/png"
          onDrop={this.onDrop}
          disableClick
          multiple
          style={this.styles.dropzone}
          ref={(node) => { dropzoneRef = node; }}
        >
          <p>Drop files here, or&nbsp;
            <a
              href="#"
              onClick={() => dropzoneRef.open()}
            >browse
            </a>
          &nbsp; to upload.
          </p>
          <aside>
            <GridList
              cellHeight={260}
              cols={4}
            >
              {this.renderImg()}
            </GridList>
          </aside>
        </Dropzone>
      </div>
    );
  }
}

export default DropZone;
