import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Tile from './Tile';
import { getCoordinate } from '../utils/gameLogic';

const { width } = Dimensions.get('window');
const CONTAINER_WIDTH = Math.min(width - 32, 500);
const GAP = 12;
const SIZE = 4;
const TILE_SIZE = (CONTAINER_WIDTH - (GAP * (SIZE + 1))) / SIZE;

const Grid = ({ board }) => {
    const { theme } = useTheme();

    return (
        <View style={[
            styles.container,
            {
                width: CONTAINER_WIDTH,
                height: CONTAINER_WIDTH,
                backgroundColor: theme.gridBackground
            }
        ]}>
            {/* Background Empty Cells */}
            {Array(SIZE * SIZE).fill(null).map((_, i) => {
                const { r, c } = getCoordinate(i);
                return (
                    <View
                        key={`bg-${i}`}
                        style={{
                            position: 'absolute',
                            width: TILE_SIZE,
                            height: TILE_SIZE,
                            backgroundColor: theme.emptyCell,
                            top: r * (TILE_SIZE + GAP) + GAP,
                            left: c * (TILE_SIZE + GAP) + GAP,
                            borderRadius: 6,
                        }}
                    />
                );
            })}

            {/* Active Tiles */}
            {board.map((tile, index) => {
                if (!tile) return null;
                const { r, c } = getCoordinate(index);
                return (
                    <Tile
                        key={tile.id}
                        value={tile.value}
                        r={r}
                        c={c}
                        size={TILE_SIZE}
                        gap={GAP}
                        isMerged={tile.merged}
                        isNew={tile.isNew}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        position: 'relative', // Context for absolute children
    },
});

export default Grid;
