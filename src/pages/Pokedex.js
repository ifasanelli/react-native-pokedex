import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image, Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Alert,
  TouchableHighlight,
} from 'react-native';

import {  SearchBar, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';

import bug from '../assets/background/bug.png'
import dark from '../assets/background/dark.png'
import dragon from '../assets/background/dragon.png'
import electric from '../assets/background/electric.png'
import fairy from '../assets/background/fairy.png'
import fighting from '../assets/background/fighting.png'
import fire from '../assets/background/fire.png'
import flying from '../assets/background/flying.png'
import ghost from '../assets/background/ghost.png'
import grass from '../assets/background/grass.png'
import ground from '../assets/background/ground.png'
import ice from '../assets/background/ice.png'
import normal from '../assets/background/normal.png'
import poison from '../assets/background/poison.png'
import psychic from '../assets/background/psychic.png'
import rock from '../assets/background/rock.png'
import steel from '../assets/background/steel.png'
import water from '../assets/background/water.png'

const types = {
  bug: {value: bug}, dark: {value: dark}, dragon: {value: dragon}, electric: {value: electric},
  fairy: {value: fairy}, fighting: {value: fighting}, fire: {value: fire}, flying: {value: flying},
  ghost: {value: ghost}, grass: {value: grass}, ground: {value: ground}, ice: {value: ice},
  normal: {value: normal}, poison: {value: poison}, psychic: {value: psychic}, rock: {value: rock},
  steel: {value: steel}, water: {value: water}
}


export default class Pokedex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      pkm: {},
      pkm_name: "",
      pkm_id: "",
      type1: "---",
      type2: "---",
      front_pic: "https://i.pinimg.com/originals/ca/3b/4b/ca3b4b148cea7c34c7597c4863b32895.png",
      back_pic: "https://i.pinimg.com/originals/ca/3b/4b/ca3b4b148cea7c34c7597c4863b32895.png",
      bg_type: normal,
      modalVisible: false,
      abldata: [],
      mvdata: [],
      show: false,
    };

    this.arrayholder = [];
    this.setPokemon = this.setPokemon.bind(this);
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const json = await response.json();
    this.arrayholder = json.results;
    this.setState({data: json.results});
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Buscar Pokémon"
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
        platform="android"
        inputStyle={{backgroundColor: '#E71D23', marginHorizontal: 0, paddingHorizontal: 0}}
        inputContainerStyle={{backgroundColor: '#E71D23'}}
        containerStyle={{backgroundColor: '#E71D23', marginBottom: 10}}
        searchIcon={{ }}
      />
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#E71D23',
          marginTop: 5,
        }}
      />
    );
  };

  setBackground = (type) => {
    const result = types[type].value
    this.setState({bg_type: result});
  }

  setAbilityText = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return json.effect_entries[0].short_effect
  };

  setMoveText = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return json.effect_entries[0].short_effect
  };

  setPokemon = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    const id = json.id.toString().padStart(3, '0');
    const abilityData = [];
    const moveData = [];

    json.abilities.map(item => {
      this.setAbilityText(item.ability.url)
        .then((data) => {
          abilityData.push({name: `${item.ability.name[0].toUpperCase()}${item.ability.name.substr(1)}`, description: data})
        })
    });
    this.setState({abldata: abilityData});

    json.moves.map(item => {
      this.setMoveText(item.move.url)
        .then((data) => {
          moveData.push({name: `${item.move.name[0].toUpperCase()}${item.move.name.substr(1)}`, description: data})
        })
    });
    this.setState({mvdata: moveData});

    console.log(this.state.mvdata)

    this.setState({pkm: json});
    this.setState({pkm_name: `${json.name[0].toUpperCase()}${json.name.substr(1)}`});
    this.setState({pkm_id: id});
    this.setState({type1: `${json.types[0].type.name[0].toUpperCase()}${json.types[0].type.name.substr(1)}`});
    if(json.types[1]){
      this.setState({type2: `${json.types[1].type.name[0].toUpperCase()}${json.types[1].type.name.substr(1)}`});
      this.setBackground(json.types[1].type.name)
    }else{
      this.setState({type2: "---"});
      this.setBackground(json.types[0].type.name)
    };
    this.setState({front_pic: json.sprites.front_default});
    this.setState({back_pic: json.sprites.back_default});
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  ShowHideComponent = () => {
    if (this.state.show == false) {
      this.setState({ show: true });
    }
    console.log(this.state.show)
  }

  render(){
    const { pkm, pkm_name, type1, type2, modalVisible,
            front_pic, back_pic, bg_type, pkm_id,
            abldata } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#BA0100"
        />
        <View style={styles.top_section}>
          <View style={styles.top_sec_but}>
            <View style={styles.big_blue_but}/>
            <View style={styles.sm_red_but}/>
            <View style={styles.sm_yellow_but}/>
            <View style={styles.sm_green_but}/>
          </View>
          <View style={styles.top_sec_separator}/>
        </View>
        <View style={styles.main_section_white}>
          <View style={styles.main_section_black}>
            <View style={styles.container_pkm}>
              <ImageBackground source={bg_type} style={styles.bg_image}>
              {this.state.show ? (
                <View style={styles.container_title}>
                  <Text style={styles.pkm_name}>{pkm_name}</Text>
                  <Text style={styles.pkm_id}>#{pkm_id}</Text>
                  </View>
                ) : null}
                <View style={styles.pkm_images}>
                   <Image source={{uri: front_pic}} style={{height: 150, width: 150}}/>
                   <Image source={{uri: back_pic}} style={{height: 150, width: 150}}/>
                </View>
                {this.state.show ? (
                  <View style={styles.pkm_desc}>
                    <View style={styles.pkm_types}>
                      <Text style={styles.pkm_type1}>{type1}</Text>
                      <Text style={styles.pkm_type2}>{type2}</Text>
                    </View>
                    <View style={styles.pkm_stats}>
                      <Text style={styles.pkm_wt}>Weight: {pkm.weight}</Text>
                      <Text style={styles.pkm_ht}>Height: {pkm.height}</Text>
                    </View>
                  </View>
                ) : null}
              </ImageBackground>
            </View>
          </View>
        </View>
        <View style={styles.bottom_sec}>
          <View style={styles.bottom_sec_separator}/>
          <View style={styles.bottom_sec_separator2}/>
        </View>
        <View style={styles.list}>
          <View style={styles.flatlist}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.button} onPress={ () => { this.setPokemon(item.url); this.ShowHideComponent();}} >
                  <Text style={styles.textlist}>
                    {`${item.name[0].toUpperCase()}${item.name.substr(1)}`}
                  </Text>
                </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
              />
          </View>
          <View style={styles.buttons}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              propagateSwipe={false}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{pkm_name} #{pkm_id}</Text>
                  <View style={styles.ablMvList}>
                    <Text style={styles.modalTextSec}>Abilities:</Text>
                    <FlatList
                      data={this.state.abldata}
                      renderItem={({ item }) => (
                      <View style={styles.ablView}>
                        <Text style={styles.ablName}>
                          {item.name}:
                        </Text>
                        <Text style={styles.ablDesc}>
                          {item.description}
                        </Text>
                      </View>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                    <Text style={styles.modalTextTer}>Moves:</Text>
                    <FlatList
                      data={this.state.mvdata}
                      renderItem={({ item }) => (
                        <View style={styles.ablView}>
                          <Text style={styles.ablName}>
                            {item.name}:
                          </Text>
                          <Text style={styles.ablDesc}>
                            {item.description}
                          </Text>
                        </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                      />
                  </View>

                  <TouchableHighlight
                    style={styles.openButton2}
                    onPress={() => {
                      this.setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Fechar</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
            {this.state.show ? (
              <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <Text style={styles.textStyle}>+ Info</Text>
              </TouchableHighlight>
            ) : null}
            <View style={styles.cross}>
              <View style={styles.crossUp} />
              <View style={styles.crossFlat} />
            </View>
            <View style={styles.but_sec}>
              <View style={styles.butA}>
                <Text style={styles.butAt}>A</Text>
              </View>
              <View style={styles.butB}>
              <Text style={styles.butBt}>B</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer} >
          <Text style={styles.footerText}>
              Desenvolvido com
          </Text>
          <Icon name='favorite' size={15} color="#eee"/>
          <Text style={styles.footerText} >
              por Ítalo Fasanelli
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E71D23',
    //backgroundColor: '#aaa',
    flex: 1,
  },

  top_sec_but: {
    flexDirection: 'row',
    backgroundColor: '#b00',
    alignItems: 'center',
    paddingTop: 15,
  },

  big_blue_but: {
    backgroundColor: '#2d98d2',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    width: 35,
    height: 35,
    marginLeft: 25,
  },

  sm_red_but: {
    backgroundColor: '#f00',
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#444',
    width: 15,
    height: 15,
    marginLeft: 20,
  },

  sm_yellow_but: {
    backgroundColor: '#e6e600',
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#444',
    width: 15,
    height: 15,
    marginLeft: 10,
  },

  sm_green_but: {
    backgroundColor: '#00e600',
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#444',
    width: 15,
    height: 15,
    marginLeft: 10,
  },

  top_sec_separator: {
    flexWrap: 'wrap-reverse',
    width: 200,
    height: 30,
    borderTopWidth: 30,
    borderTopColor: '#b00',
    borderRightWidth: 30,
    borderRightColor: '#E71D23',
  },

  main_section_white: {
    backgroundColor: '#DEDEDE',
    borderColor: '#333',
    borderWidth: 3,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 3,
    padding: 10,
    elevation: 5
  },

  main_section_black: {
    backgroundColor: '#222',
    margin: 5,
    borderRadius: 3,
  },

  container_pkm: {
    backgroundColor: '#000',
    borderColor: '#111',
    borderWidth: 3,
    margin: 5,
    borderRadius: 15,
    height: 330
  },

  bg_image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
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
    color: 'rgba(255,255,255,1)',
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

  bottom_sec: {
    flexDirection: 'row',
    //lignItems: 'center', //vertical
    //justifyContent: 'center',
    //alignContent: 'center',
    //flex: 1,
    backgroundColor: '#b00',
  },

  bottom_sec_separator: {
    flexWrap: 'wrap',
    width: 200,
    height: 30,
    borderRightWidth: 30,
    borderRightColor: '#b00',
    borderTopWidth: 30,
    borderTopColor: '#E71D23',
  },

  bottom_sec_separator2: {
    backgroundColor: '#b00',
    height: 30,
    width: 200,
  },

  list: {
    backgroundColor: '#b00',
    flex: 1,
    flexDirection: 'row',
  },

  flatlist: {
    backgroundColor: '#b00',
    padding: 20,
    flex: 3,
  },

  buttons: {
    backgroundColor: '#b00',
    padding: 20,
    flex: 1,
  },

  textlist: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },

  centeredView: {
    flex: 1,
    height: 800,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },

  ablMvList: {
    flex: 1,
    height: 800,
    alignItems: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  openButton: {
    backgroundColor: '#E71D23',
    borderRadius: 10,
    padding: 5,
    elevation: 5
  },

  openButton2: {
    backgroundColor: '#E71D23',
    borderRadius: 10,
    padding: 5,
    elevation: 5,
    marginTop: 25,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  modalText: {
    marginVertical: 0,
    textAlign: "center",
    fontSize: 30,
    color: "#333",
    fontWeight: "bold",
  },

  modalTextSec: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#666"
  },

  modalTextTer: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#666"
  },

  ablView: {

  },

  ablName: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 3,
  },

  ablDesc: {
    marginBottom: 10,
    fontSize: 14,
  },

  cross: {
    marginTop: 30,
  },
  crossUp: {
    backgroundColor: '#111',
    height: 80,
    width: 28,
    left: 20,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: '#222',
  },
  crossFlat: {
    backgroundColor: '#111',
    height: 28,
    width: 80,
    position: 'absolute',
    left: -7,
    top: 25,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: '#222',
  },

  but_sec: {

  },

  butA: {
    backgroundColor: '#000',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#222',
    width: 40,
    height: 40,
    marginLeft: 40,
    marginTop: 10,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  butB: {
    backgroundColor: '#000',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#222',
    width: 40,
    height: 40,
    marginLeft: 0,
    marginTop: 0,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  butAt: {
    color: "#999"
  },

  butBt: {
    color: "#999"
  },

  footer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  footerText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#eee",
    paddingVertical: 5,
    paddingHorizontal: 4,
  },

});
