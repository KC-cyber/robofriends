import React from 'react';
import {connect} from 'react-redux';
//import {robots} from './robots';
import SearchBox from './SearchBox.js';
import CardList from './CardList';
import Scroll from './Scroll';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

import {setSearchField,requestRobots} from './actions'; 

const mapStateToProps=(state)=>{
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
    onSearchChange: (event)=> dispatch(setSearchField(event.target.value)),
    onRequestRobots: ()=>dispatch(requestRobots())
    }
}

class App extends React.Component{

    componentDidMount(){
        this.props.onRequestRobots();
    }

    // onSearchChange=(event)=>{
    //     this.setState({searchField: event.target.value});
        
        
    // }
    
    render(){
    const {searchField, onSearchChange,robots,isPending}=this.props;
    const filteredRobots=robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if(isPending){
        return <h1>LOADING</h1>
    }
    else{
    //return filteredRobots.length?filteredRobots:{};
        return(
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
   
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);