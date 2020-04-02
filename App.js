import './shim';

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import * as jwt from 'jsonwebtoken';
import {isRequired} from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

const publicKey = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCw7U9VvVNmhZnGj/eP58ngZlsa
SWPci0DLlRerl+wpKhlL8HtEPGV+2RkjAWOdHPHEVaagUfj/cRgjItaVGVgEyo+P
eFyNv/BX6tJrFQVzYfzzhSHjZ05ww43AH4PB+dHbX5t+SMlBsvNlH1R0vcSzWyh7
Ma+0sVBwxDtSIQ/aCwIDAQAB
-----END PUBLIC KEY-----
`;

const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCw7U9VvVNmhZnGj/eP58ngZlsaSWPci0DLlRerl+wpKhlL8HtE
PGV+2RkjAWOdHPHEVaagUfj/cRgjItaVGVgEyo+PeFyNv/BX6tJrFQVzYfzzhSHj
Z05ww43AH4PB+dHbX5t+SMlBsvNlH1R0vcSzWyh7Ma+0sVBwxDtSIQ/aCwIDAQAB
AoGAMx4teNE9onZhSpxX440Np7cLBVpE7viQ3QETmLFJO099hZJSmxF0JaUl/RYu
qLsvIxG4FcP5VBxh4+zx4Jw08Jo1bcexBDlYra/kzO4n+7Au+fdbX5zHEaVhAQJa
RN1qoIO+3U01TP88OwVLyAme/iQ9d70Ck7H0ZFM0eqjLI4ECQQDjA3M506dk5ugi
HGKvoepd8RVi6EFeUAkXiXicrtr+JqzztjPGLpD1cboUwtdQb/zyiD6MZ1ejgQPV
pcPXucdBAkEAx4SlwQFBZNqJGWDAXMcclWrQ8n7Cw82UKPWNBpfbWL8tody0i8on
9yAa1J0I57aE2t/qhOJ3vDBw2D0Hcs36SwJBALa3ly3LEqefRuX1rOSqUSYtnkYO
pFaR2s+MAX0zK+Z2IKzEUSXJYzl6wQhmzsDacmCPkrCVmS9r7zcuBdSDnkECQA4P
2ErZFs3P5TfHrOcdFXOmeqGMs5dvRtD4NX9QdqIznzi4QHVVwylUtu9jPfxuzcBL
ZdEF0SCPXXSwIHVD9S8CQC3gElbGog3DugD9PtT+S9Nx8FanycZqo3pbYa4WgYz+
xr+qKymlOn5ofvu/PVT92R/aaY5yiyGag9s1mkCTU1E=
-----END RSA PRIVATE KEY-----
`;

const App = () => {
  useEffect(() => {
    const test = async () => {
      // encode (for test purposes - it will be done on server side)
      const token = jwt.sign(
        {foo: 'bar', iss: 'ISSUER', sub: 'SUBJECT', aud: 'AUDIENCE'},
        privateKey,
        {
          algorithm: 'RS256',
          expiresIn: '1h',
        },
      );

      // decoding token
      try {
        const decoded = jwt.verify(token, publicKey, {
          audience: 'AUDIENCE',
          issuer: 'ISSUER',
          subject: 'SUBJECT',
          algorithms: ['RS256'],
        });
        console.log(decoded);
      } catch (e) {
        console.log('ERROR:', e);
      }
    };

    test();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionDescription}>
                Decoding JWT (lookup in browser console)
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
