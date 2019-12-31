import React from 'react';
import {Image} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import sha1 from './sha1';

class CacheImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uri: null
        }
    }

    render() {
        return (
            <Image
                source={{uri: this.state.uri}}
                {...this.props}
            />
        );
    }

    componentDidMount() {
        const props = this.props;
        let dirs = RNFetchBlob.fs.dirs;
        let uri = props.source.uri;
        let path = dirs.CacheDir + '/' + sha1(uri);

        RNFetchBlob.fs.exists(path).then((exist) => {
            if (exist) {
                this.setState({uri:path});
            } else {
                this.setState({uri});
                RNFetchBlob.config({
                    path
                }).fetch('GET', uri).then(res => {
                    console.log(res);
                });
            }
        }).catch((e) => {
            this.setState({uri});
            console.log(e);
        });
    }
}

module.exports = CacheImage;
