import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()
import { db, auth } from '../firebase/config'
import Post from '../components/Post'


export default class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            todosLosPosts: []
        }
    }

    componentDidMount(){
        db
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .limit(5)
        .onSnapshot( docs => {
            let arrDocs = []
            docs.forEach( (doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            } )

            this.setState({
                todosLosPosts: arrDocs
            }, () => console.log('state posts', this.state))
        })
    }




    render() {
        return (
        
        <View style={styles.container}>
          <Text style={styles.title}>Todos Los Posts</Text>

          {this.state.todosLosPosts.length === 0
          ?
            (<Text style={styles.nohay}>¡No hay posts, sé el primero en postear!</Text>)
            :
            (
            <FlatList
                data={this.state.todosLosPosts}
                keyExtractor={ ( item ) => item.id.toString() }
                renderItem={ ( { item } ) => 
                <Post item={item} />
            }
            />
            )
        }
            
             
 
        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  nohay: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  }
})