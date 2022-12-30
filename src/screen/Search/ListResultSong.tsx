//TODO: PENDING TILL BE COMPLETED
// import {FlatList, StyleSheet} from 'react-native';
// import React, {FC} from 'react';
// import {ListCard} from '../../components';

// interface ListResultSongProps {
//   dataSearchSong: ListDataSearchSong[];
// }

// const ListResultSong: FC<ListResultSongProps> = (
//   props: ListResultSongProps,
// ) => {
//   const {dataSearchSong} = props;

//   const resultDataMore = (dataResult: any) => {
//     console.log(dataResult, 'resultDataMenu');
//   };

//   return (
//     <FlatList
//       data={dataSearchSong}
//       renderItem={({item, index}) => (
//         <ListCard.MusicList
//           imgUri={item.fullname}
//           musicNum={(index + 1).toLocaleString('en-US', {
//             minimumIntegerDigits: 2,
//             useGrouping: false,
//           })}
//           musicTitle={item.musicTitle}
//           singerName={item.singerName}
//           onPressMore={resultDataMore}
//           containerStyles={{marginTop: mvs(20)}}
//           onPressCard={() => setModalVisible(true)}
//         />
//       )}
//     />
//   );
// };

// export default ListResultSong;

// const styles = StyleSheet.create({});
