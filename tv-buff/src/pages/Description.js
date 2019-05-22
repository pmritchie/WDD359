import React, { Component } from 'react';
import Search from '../components/search/Search.js';
import Header from '../components/header/Header.js';
import Card from '../components/card/Card'
import hikers from '../components/images/hikers.jpg'


class Description extends Component{
    state = {
        actors: [],
        isLoading: true,
        search: '',
    }

    render(){
        return(
            <div style={styles.div}>
                <Header />
                <Search />
                <section class="container" >
                    <div class="row">
                        <Card style={styles.card} alt={"Hikers picture"} image={hikers} title={"Hikers Hiking"}/>
                        <Card style={styles.card} alt={"Hikers picture"} image={hikers} title={"Hikers Hiking"}/>
                        <Card style={styles.card} alt={"Hikers picture"} image={hikers} title={"Hikers Hiking"}/>
                    </div>
                    <div class="row">
                        <Card style={styles.card} alt={"Hikers picture"} image={hikers} title={"Hikers Hiking"}/>
                        <Card style={styles.card} alt={"Hikers picture"} image={hikers} title={"Hikers Hiking"}/>
                        <Card style={styles.card} alt={"Hikers picture"} image={hikers} title={"Hikers Hiking"}/>
                    </div>
                <h1>Descriptions Page</h1>
                </section>
            </div>
        )
    }
}

export default Description;

const styles = {
    div: {
        display: "grid",
        backgroundSize: '100%',
        width: "100%",
        hieght: "100%"
    },
    card: {
        margin: ".5rem",
        padding: ".5"
    }
    
}