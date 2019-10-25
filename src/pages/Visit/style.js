import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    visitData: {
      flex: 1,
      width: '100%'
    },
    cameraView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      height: 400,
      width: 400,
      backgroundColor: 'transparent',

    }, 
    camera: {
      flex: 1,
      marginTop: 10,
      height: 400,
      width: 400
    },
    footerButtons: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 5
    }
  })