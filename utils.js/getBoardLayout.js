const getBoardLayout = () => {
    const tWidth = process.stdout.columns;
  
    const hSpacing = 6;
    const gridWidth = 6 + hSpacing * 5;
    const vSpacing = 3;
    const vGutter = 2;
    const hGutter = tWidth / 2 - gridWidth / 2;
    const border = "*";
  
    return {
      tWidth,
      hSpacing,
      vSpacing,
      vGutter,
      hGutter,
      border,
    };
  };
  
  module.exports = getBoardLayout;