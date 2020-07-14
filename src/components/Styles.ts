import styled  from 'styled-components'


export const Wrapper = styled.div`
    padding: 0 4%;
`

export const Header = styled.div`
    margin: 50px 0 15px 0;
    padding-bottom: 50px;

    font-style: normal;
    font-weight: bold;
    font-size: 33px;
    line-height: 27px;
    color: ${(props)=> props.color ? props.color  : '#64A928'};
    
    border-bottom: 2px solid #4D5C5E; 
`

export const MainButton  = styled.button`
    background: #AA8B25;
    border-radius: 10px;
    font-size: 18px;
    line-height: 207.9%;
    display: flex;
    align-items: center;
    text-align: center;
    border: none;
    padding: 5px 40px;
    cursor: pointer;    
    color: #FFFFFF;
`