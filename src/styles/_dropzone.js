const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderwidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderstyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const dropZone = {
    baseStyle,
    focusedStyle,
    acceptStyle,
    rejectStyle,
}

export {
    dropZone,
}