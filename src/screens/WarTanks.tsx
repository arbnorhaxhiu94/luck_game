import React, { useEffect, useRef, useState } from "react";
import { Alert, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native"; 
import { SCREEN } from "../config/Constants";

type positionType = {
  x: number,
  y: number
}

const WarTanks = () =>  {

  const tankInitialPosition: positionType = {
    x: SCREEN.width/2 - 25,
    y: SCREEN.height - 100
  };

  const enemyTankInitialPosition: positionType = {
    x: SCREEN.width/2,
    y: 100
  }

  let enemyBullets = 1;

  const enemyTankTimer = useRef<NodeJS.Timer>(setInterval(() => {}, 0));
  const enemyShootTimer = useRef<NodeJS.Timer>(setInterval(() => {}, 0));
  const enemyBulletTimer = useRef<NodeJS.Timer>(setInterval(() => {}, 0));
  const bulletTimer1 = useRef<NodeJS.Timer>(setInterval(() => {}, 0));

  const [ shoot, setShoot ] = useState<boolean>(false); 
  const [ bulletPositionX, setBulletPositionX ] = useState<number>(tankInitialPosition.x);
  const [ bulletPositionY, setBulletPositionY ] = useState<number>(tankInitialPosition.y);

  const [ tankPosition, setTankPosition ] = useState<positionType>(tankInitialPosition);

  const [ enemyTankPositionX, setEnemyTankPositionX ] = useState<number>(enemyTankInitialPosition.x);
  const [ enemyTankPositionY, setEnemyTankPositionY ] = useState<number>(enemyTankInitialPosition.y);

  const [ enemyShoot, setEnemyShoot ] = useState<boolean>(false);
  const [ enemyBulletPositionX, setEnemyBulletPositionX ] = useState<number>(enemyTankInitialPosition.x);
  const [ enemyBulletPositionY, setEnemyBulletPositionY ] = useState<number>(enemyTankInitialPosition.y);

  const handlePositionChange = (e: GestureResponderEvent) => {
    // console.log(e.nativeEvent.pageX, e.nativeEvent.pageY)

    if (e.nativeEvent.pageX > SCREEN.width - 50) {
      return
    } 
    if (e.nativeEvent.pageY > SCREEN.height - 50 || e.nativeEvent.pageY < SCREEN.height - 100) {
      return
    }

    setTankPosition({
      x: e.nativeEvent.pageX, 
      y: e.nativeEvent.pageY
    });
  }

  const shootFire = () => {
    clearInterval(bulletTimer1.current);
    setBulletPositionX(tankPosition.x + 15);
    setBulletPositionY(tankPosition.y);
    setShoot(true);
    bulletTimer1.current = global.setInterval(() => {
      setBulletPositionY(prevValue => prevValue - 5);
    }, 5);
  }

  useEffect(() => {
    if (bulletPositionY < 150) {
      if (bulletPositionX > enemyTankPositionX - 20 && bulletPositionX < enemyTankPositionX + 50) {
        clearInterval(bulletTimer1.current);
        clearInterval(enemyTankTimer.current);
        Alert.alert('Hit')
      }
      if (bulletPositionY < 90) {
        clearInterval(bulletTimer1.current)
        Alert.alert('Missed');
        setShoot(false);
      }
    }
  }, [bulletPositionY]);

  const enemyTankMovement = (direction: 'left' | 'right') => {
    enemyTankTimer.current = setInterval(() => {
      if (direction == 'right') {
        setEnemyTankPositionX(prevState => prevState + 5);
      } else if(direction == 'left') {
        setEnemyTankPositionX(prevState => prevState - 5);
      }
    }, 0.1);
  }

  const enemyBulletMovement = () => {
    setEnemyBulletPositionX(enemyTankPositionX);
    setEnemyBulletPositionY(100)
    enemyBulletTimer.current = setInterval(() => {
      setEnemyBulletPositionY(prevState => prevState + 2);
    }, 10);
    enemyBullets += 1;
  }

  const enemyShooting = () => {
      setEnemyShoot(true);
      enemyBulletMovement();
  }

  useEffect(() => {
    console.log('Enemy bullet position: '+enemyBulletPositionY);
    if (enemyBulletPositionY > SCREEN.height - 115) {
      if (enemyBulletPositionX > tankPosition.x && enemyBulletPositionX < tankPosition.x + 50) {
        clearInterval(enemyBulletTimer.current);
        clearInterval(enemyTankTimer.current);
        setEnemyShoot(false);
        Alert.alert('Game Over');
      }
      if (enemyBulletPositionY > SCREEN.height - 50) {
        clearInterval(enemyBulletTimer.current);
        setEnemyShoot(false);
        enemyShooting();
      }
    }
  }, [enemyBulletPositionY]);

  useEffect(() => {
    // console.log('X: '+enemyTankPositionX)
    if (enemyTankPositionX > SCREEN.width - 50) {
      clearInterval(enemyTankTimer.current);
      enemyTankMovement('left');
    } else if (enemyTankPositionX < 0) {
      clearInterval(enemyTankTimer.current);
      enemyTankMovement('right');
    }
  }, [enemyTankPositionX]);

  useEffect(() => {
    enemyTankMovement('right');
    enemyShooting();
  }, []);

  return (
    <>
      <View style={{
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        position: 'absolute',
        top: SCREEN.height - 100,
        left: tankPosition.x
      }}
      onTouchMove={(e) => handlePositionChange(e)} />

      <View style={{
        width: 50,
        height: 50,
        backgroundColor: 'green',
        position: 'absolute',
        top: enemyTankPositionY,
        left: enemyTankPositionX
      }} />

      {shoot ?
      <View style={{
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        top: bulletPositionY,
        left: bulletPositionX
      }} /> : null}

      {enemyShoot ? 
      <View style={{
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'orange',
        top: enemyBulletPositionY,
        left: enemyBulletPositionX
      }} /> : null}

      <TouchableOpacity style={{
        position: 'absolute',
        bottom: 200,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
      }} 
      onPress={() => shootFire()} >
        <Text>Shoot</Text>
      </TouchableOpacity>
    </>
  );
}
  
export default WarTanks;