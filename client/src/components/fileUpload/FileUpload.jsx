import React, { Component } from 'react';
import { connect } from 'react-redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import DropZone from './DropZone.jsx';


class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: 0,
    };
  }

  handleChange(event, index, value) {
    this.setState({ value });
  }

  renderFolders() {
    // use fakeDB data
    const folders = sessionStorage.getItem('fakeDB').split(',');
    return folders.map((folder, i) => <MenuItem key={i} value={i} primaryText={folder} />);
  }

  render() {
    return (
      <div>
        <p>Select a folder</p>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
        >
          {this.renderFolders()}
        </SelectField>
        <DropZone />
      </div>
    );
  }
}

export default FileUpload;
