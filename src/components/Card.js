import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

import mewtwo from '../assets/mewtwo.gif';
import mewtwo_back from '../assets/mewtwo_back.gif';

export default class Card extends Component {

  constructor(props){
    super(props)

    this.state = {
      pokemon: this.props.pokemon
    }
  }

  render(){
    const { pokemon } = this.state
    return(
      <View style={styles.main_section_white}>
        <View style={styles.main_section_black}>
          <View style={styles.container_pkm}>
            <View style={styles.container_title}>
              <Text style={styles.pkm_name}>{pokemon.name}</Text>
              <Text style={styles.pkm_id}>#{pokemon.order}</Text>
            </View>
            <View style={styles.pkm_images}>
              <Image source={mewtwo} style={styles.pkm_sprite}/>
              <Image source={mewtwo_back} style={styles.pkm_sprite_back}/>
            </View>
            <View style={styles.pkm_desc}>
              <View style={styles.pkm_types}>
                <Text style={styles.pkm_type1}>Psychic</Text>
                <Text style={styles.pkm_type2}>---</Text>
              </View>
              <View style={styles.pkm_stats}>
                <Text style={styles.pkm_wt}>Weight: 1220</Text>
                <Text style={styles.pkm_ht}>Height: 20</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_section_white: {
    backgroundColor: '#DEDEDE',
    borderColor: '#333',
    borderWidth: 3,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 3,
    padding: 10,
    //alignItems: 'flex-start', //vertical
  },

  main_section_black: {
    backgroundColor: '#222',
    margin: 5,
    borderRadius: 3,
  },

  container_pkm: {
    backgroundColor: '#FA65B4',
    borderColor: '#111',
    borderWidth: 3,
    margin: 5,
    borderRadius: 15,
    padding: 10,
  },

  container_title: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center', //vertical
  },

  pkm_name: {
    fontWeight: '700',
    color: '#FFF',
    fontSize: 30,
  },

  pkm_id: {
    fontWeight: '700',
    color: 'rgba(0,0,0,0.5)',
    fontSize: 25,
  },

  pkm_images: {
    justifyContent: 'space-around', // horizontal
    flexDirection: 'row',
    marginTop: 5,
  },

  pkm_desc: {
    justifyContent: 'space-around', // horizontal
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },

  pkm_types: {
    marginVertical: 5,
    alignItems: 'center',
  },

  pkm_type1: {
    fontWeight: '700',
    color: 'rgba(0,0,0,0.5)',
    fontSize: 20,
    backgroundColor: 'rgba(255,255,255,.3)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 5,
  },

  pkm_type2: {
    fontWeight: '700',
    color: 'rgba(0,0,0,0.5)',
    fontSize: 20,
    backgroundColor: 'rgba(255,255,255,.3)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },

  pkm_stats: {
    backgroundColor: 'rgba(255,255,255,.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center', //vertical
    justifyContent: 'space-around',
  },

  pkm_wt: {
    fontWeight: '700',
    color: 'rgba(0,0,0,0.5)',
    fontSize: 20,
  },

  pkm_ht: {
    fontWeight: '700',
    color: 'rgba(0,0,0,0.5)',
    fontSize: 20,
  },
})
