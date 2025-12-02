/**
 * Keyboard Keys
 * @readonly
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export namespace KeyboardKeys {
  export const BACKSPACE: string = "Backspace";
  export const ENTER: string = "Enter";
  export const ESCAPE: string = "Escape";
  export const COMMA: string = ",";
  export const PERIOD: string = ".";
  export const COLON: string = ":";
  export const HASH: string = "#";
  export const SPACE: string = " ";
  export const PLUS: string = "+";
  export const MINUS: string = "-";
  export const DIGIT_0: string = "0";
  export const DIGIT_1: string = "1";
  export const DIGIT_2: string = "2";
  export const DIGIT_3: string = "3";
  export const DIGIT_4: string = "4";
  export const DIGIT_5: string = "5";
  export const DIGIT_6: string = "6";
  export const DIGIT_7: string = "7";
  export const DIGIT_8: string = "8";
  export const DIGIT_9: string = "9";
  export const LOWER_A: string = "a";
  export const LOWER_B: string = "b";
  export const LOWER_C: string = "c";
  export const LOWER_D: string = "d";
  export const LOWER_E: string = "e";
  export const LOWER_F: string = "f";
  export const LOWER_G: string = "g";
  export const LOWER_H: string = "h";
  export const LOWER_I: string = "i";
  export const LOWER_J: string = "j";
  export const LOWER_K: string = "k";
  export const LOWER_L: string = "l";
  export const LOWER_M: string = "m";
  export const LOWER_N: string = "n";
  export const LOWER_O: string = "o";
  export const LOWER_P: string = "p";
  export const LOWER_Q: string = "q";
  export const LOWER_R: string = "r";
  export const LOWER_S: string = "s";
  export const LOWER_T: string = "t";
  export const LOWER_U: string = "u";
  export const LOWER_V: string = "v";
  export const LOWER_W: string = "w";
  export const LOWER_X: string = "x";
  export const LOWER_Y: string = "y";
  export const LOWER_Z: string = "z";
  export const UPPER_A: string = "A";
  export const UPPER_B: string = "B";
  export const UPPER_C: string = "C";
  export const UPPER_D: string = "D";
  export const UPPER_E: string = "E";
  export const UPPER_F: string = "F";
  export const UPPER_G: string = "G";
  export const UPPER_H: string = "H";
  export const UPPER_I: string = "I";
  export const UPPER_J: string = "J";
  export const UPPER_K: string = "K";
  export const UPPER_L: string = "L";
  export const UPPER_M: string = "M";
  export const UPPER_N: string = "N";
  export const UPPER_O: string = "O";
  export const UPPER_P: string = "P";
  export const UPPER_Q: string = "Q";
  export const UPPER_R: string = "R";
  export const UPPER_S: string = "S";
  export const UPPER_T: string = "T";
  export const UPPER_U: string = "U";
  export const UPPER_V: string = "V";
  export const UPPER_W: string = "W";
  export const UPPER_X: string = "X";
  export const UPPER_Y: string = "Y";
  export const UPPER_Z: string = "Z";
}
/**
 * Keyboard Digits and Letters
 * @namespace
 * @readonly
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export namespace KeyboardKeyArrays {
  export const DIGITS: string[] = [ KeyboardKeys.DIGIT_0,
    KeyboardKeys.DIGIT_1,
    KeyboardKeys.DIGIT_2,
    KeyboardKeys.DIGIT_3,
    KeyboardKeys.DIGIT_4,
    KeyboardKeys.DIGIT_5,
    KeyboardKeys.DIGIT_6,
    KeyboardKeys.DIGIT_7,
    KeyboardKeys.DIGIT_8,
    KeyboardKeys.DIGIT_9 ];
  export const UPPER_LETTERS: string[] = [ KeyboardKeys.UPPER_A,
    KeyboardKeys.UPPER_B,
    KeyboardKeys.UPPER_C,
    KeyboardKeys.UPPER_D,
    KeyboardKeys.UPPER_E,
    KeyboardKeys.UPPER_F,
    KeyboardKeys.UPPER_G,
    KeyboardKeys.UPPER_H,
    KeyboardKeys.UPPER_I,
    KeyboardKeys.UPPER_J,
    KeyboardKeys.UPPER_K,
    KeyboardKeys.UPPER_L,
    KeyboardKeys.UPPER_M,
    KeyboardKeys.UPPER_N,
    KeyboardKeys.UPPER_O,
    KeyboardKeys.UPPER_P,
    KeyboardKeys.UPPER_Q,
    KeyboardKeys.UPPER_R,
    KeyboardKeys.UPPER_S,
    KeyboardKeys.UPPER_T,
    KeyboardKeys.UPPER_U,
    KeyboardKeys.UPPER_V,
    KeyboardKeys.UPPER_W,
    KeyboardKeys.UPPER_X,
    KeyboardKeys.UPPER_Y,
    KeyboardKeys.UPPER_Z ];
  export const LOWER_LETTERS: string[] = [ KeyboardKeys.LOWER_A,
    KeyboardKeys.LOWER_B,
    KeyboardKeys.LOWER_C,
    KeyboardKeys.LOWER_D,
    KeyboardKeys.LOWER_E,
    KeyboardKeys.LOWER_F,
    KeyboardKeys.LOWER_G,
    KeyboardKeys.LOWER_H,
    KeyboardKeys.LOWER_I,
    KeyboardKeys.LOWER_J,
    KeyboardKeys.LOWER_K,
    KeyboardKeys.LOWER_L,
    KeyboardKeys.LOWER_M,
    KeyboardKeys.LOWER_N,
    KeyboardKeys.LOWER_O,
    KeyboardKeys.LOWER_P,
    KeyboardKeys.LOWER_Q,
    KeyboardKeys.LOWER_R,
    KeyboardKeys.LOWER_S,
    KeyboardKeys.LOWER_T,
    KeyboardKeys.LOWER_U,
    KeyboardKeys.LOWER_V,
    KeyboardKeys.LOWER_W,
    KeyboardKeys.LOWER_X,
    KeyboardKeys.LOWER_Y,
    KeyboardKeys.LOWER_Z ];
  export const LETTERS: string[] = [ ...UPPER_LETTERS, ...LOWER_LETTERS ];
}
