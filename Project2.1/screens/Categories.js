import React from 'react';
import Category from './Category'
import { FlatList } from 'react-native-web';

export default class Categories extends React.Component{    
    constructor(props){
        super(props);
        this.state = {
            categories: [
                {id: 1, name: 'Phim hành động'},
                {id: 2, name: 'Phim Trung Quốc'}
            ]
        }
    }
    render() {
        const {categories} = this.state;
        return (
             <FlatList
                data={categories}
                renderItem={({item}) => <Category category={item}></Category>}
                keyExtractor={item => `${item.id}`}
                contentContainerStyle={{paddingLeft: 16, paddingRight: 16}}
             >

             </FlatList>
        );
    }

}