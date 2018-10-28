import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.css';


function debounce(fn, delay) {
    let timer = null;
    return function () {
        let context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

export default class GooglePlaceSearchInput extends React.Component {

    static propTypes = {
        onChange: PropTypes.func,
        onPlaceSelected: PropTypes.func.isRequired,
        onRemove: PropTypes.func,
        value: PropTypes.string,
        inputClassName: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        containerClassName: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        autoCompleteContainerClassName: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        resultClassName: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        numberResults: PropTypes.number
    }

    static defaultProps = {
        numberResults: 5
    }

    constructor(props) {
        super(props);

        this.poweredImage = 'https://developers.google.com/places/documentation/images/powered-by-google-on-white.png';

        this.state = {
            inputValue: props.value || '',
            placeResults: []
        };

        this._getPlace = debounce(this._getPlace, 100) // changed to 00ms - Manpreet
    }

    componentDidMount() {
        if (!window.google) {
            throw new Error(
                '[react-google-place-autocomplete-input]: Google Maps JavaScript API library must be loaded. See: https://developers.google.com/maps/documentation/javascript/places'
            );
        }

        if (!window.google.maps.places) {
            throw new Error(
                '[react-google-place-autocomplete-input]: Google Maps Places library must be loaded. Please add `libraries=places` to the src URL. See: https://developers.google.com/maps/documentation/javascript/places'
            );
        }

        this.autocompleteService = new window.google.maps.places.AutocompleteService();

        if (this.props.value) {
            this._getPlace(this.props.value);
        }

    }

    componentWillUpdate(){
        console.log('[autoComplete.js] componentWillUpdate');
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('[autoComplete.js] shouldComponentUpdate');
        return nextState.inputValue !== this.state.inputValue || nextState.placeResults !== this.state.placeResults ;
    }

    componentDidUpdate(){
        console.log('[autoComplete.js] componentDidUpdate');

    }

    _getPlace = inputValue => {
        if (!inputValue) {
            return;
        }

        this.autocompleteService.getPlacePredictions({
            input: inputValue
        }, (predictions) => {
            predictions = predictions ? predictions.map((prediction, idx) => {
                return { ...prediction, index: idx};
            }) : [];
            this.setState({
                placeResults: (predictions || []).slice(0, this.props.numberResults)
            });

            if (this.props.onChange) {
                this.props.onChange(predictions);
            }
        })
    };

    _onChange = event => {
        this.setState({
            inputValue: event.target.value
        });
        // console.log(event.target.value);
        this._getPlace(event.target.value);

         //if input become empty remove the all prediction results - added by Manpreet
        if(!event.target.value){
            this._removeLocation();
        }
    }

    _onClick = (event, place) => {
        event.preventDefault();
        this.setState({
            inputValue: event.target.innerHTML,
            placeResults: []
        });

        if (!place) return;

        this.props.onPlaceSelected(place);
    }

    _removeLocation = (event) => {
        this.setState({
            inputValue: '',
            placeResults: []
        });

        if (this.props.onRemove) {
            return this.props.onRemove(event);
        }
    }

    _handleInputKeyDown = event => {
        switch (event.key) {
            case 'Enter':
                event.preventDefault();
                this.handleEnterKey();
                break;
            case 'ArrowDown':
                event.preventDefault(); // prevent the cursor from moving
                this.handleDownKey();
                break;
            case 'ArrowUp':
                event.preventDefault(); // prevent the cursor from moving
                this.handleUpKey();
                break;
            case 'Escape':
                event.preventDefault();
                this._removeLocation();
        }
    };

    handleEnterKey = () => {
        const activePredication = this.state.placeResults.find(prediction => prediction.active);
        if (!activePredication) return;

        this.setState({
            inputValue: activePredication.description,
            placeResults: []
        });

        this.props.onPlaceSelected(activePredication);
    };

    handleUpKey = () => {
        if (this.state.placeResults.length === 0) {
            return;
        }

        const activePredication = this.state.placeResults.find(prediction => prediction.active);
        if (activePredication === undefined) {
            this.selectActiveAtIndex(this.state.placeResults.length - 1);
        } else if (activePredication.index === 0) {
            this.selectActiveAtIndex(this.state.placeResults.length - 1);
        } else {
            this.selectActiveAtIndex(activePredication.index - 1);
        }
    };

    handleDownKey = () => {
        if (this.state.placeResults.length === 0) {
            return;
        }

        const activePredication = this.state.placeResults.find(prediction => prediction.active);
        if (activePredication === undefined) {
            this.selectActiveAtIndex(0);
        } else if (activePredication.index === this.state.placeResults.length - 1) {
            this.selectActiveAtIndex(0);
        } else {
            this.selectActiveAtIndex(activePredication.index + 1);
        }
    };

    selectActiveAtIndex = index => {
        console.log('mouse hovering ');

        this.setState({
            placeResults: this.state.placeResults.map((prediction, idx) => {
                if (idx === index) {
                    return { ...prediction, active: true };
                } else {
                    return { ...prediction, active: false };
                }
            }),
        });
    };

    renderSearchIcon = () => <div className={styles.searchIcon}>
        <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 451 451">
            <g>
                <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3
					s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4
					C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3
					s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z"/>
            </g>
        </svg>
    </div>

    render() {
        return <div className={classNames(['searchContainer', this.props.containerClassName])}>
            <div className={'searchInputContainer'}>

                <input

                    value={this.state.inputValue}
                    onChange={this._onChange}
                    className={classNames(['searchInput', this.props.inputClassName])}
                    onKeyDown={this._handleInputKeyDown}
                    placeholder='Location'
                />
            </div>
            {/*<div className={classNames(['poweredByGoogle', this.props.resultClassName])}><img src={this.poweredImage} /></div>*/}
            {!!this.state.placeResults.length &&
            <div className={classNames(['autoCompleteContainer', this.props.autoCompleteContainerClassName])}>
                {this.state.placeResults.map(thisPrediction => {
                    return <div
                        key={thisPrediction.id}
                        className={classNames(['searchResult', this.props.resultClassName, !!thisPrediction.active && 'activeSearchResult' ])}
                        onClick={(evt) => this._onClick(evt, thisPrediction)}
                        id={thisPrediction.id}
                        onMouseOver={() => this.selectActiveAtIndex(thisPrediction.index)}>
                        {thisPrediction.description}
                    </div>
                })}
                {/*<div className={classNames(['searchResult', 'removeLocation'])} onClick={this._removeLocation}>*/}
                    {/*Remove location*/}
                {/*</div>*/}
            </div>
            }
        </div>
    }

};