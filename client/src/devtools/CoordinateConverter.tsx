const asdf = [
    [
        [1234, 1234],
        [1234, 1234]
    ],
    [
        [1234, 1234],
        [1234, 1234]
    ],
    [
        [1234, 1234],
        [1234, 1234]
    ],
];

function CoordinateConverter(array: number[] | [number, number]): [number, number];
function CoordinateConverter(array: number[][] | [number, number][]): [number, number][];
function CoordinateConverter(array: number[][][] | [number, number][][]): [number, number][][];
function CoordinateConverter(array: number[] | number[][] | number[][][] | [number, number] | [number, number][] | [number, number][][]): [number, number] | [number, number][] | [number, number][][] {

    // eslint-disable-next-line
    function isNested(item: number[] | number[][] | number[][][] | [number, number] | [number, number][] | [number, number][][]): item is number[][] | number[][][] {
        if (Array.isArray(item)) {
            return Array.isArray(array[0]);
        }
        else return false;
    }

    if (Array.isArray(array) && !Array.isArray(array[0])) {
        return array.reverse() as [number, number];
    }
    // else if (Array.isArray(array) && isNested(array)) {
    //     return array.map((item) => {
    //         return CoordinateConverter(arr);
    //     });
    // }
    else return [];
}

export default CoordinateConverter;

CoordinateConverter(asdf);