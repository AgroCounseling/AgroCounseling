import React, {useEffect, useState} from 'react'
import {NavBarElement, NavBarWrapper} from "./NavBarElements";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCategories} from "../../state/selectors";
import {GlobalStateType} from "../../state/root-reducer";
import css from './nav-bar.module.css'
import drop from '../../img/dropDown.png'

type OwnProps = {}
const NavBar = (props: OwnProps) => {
    const categories = useSelector((state: GlobalStateType) => getCategories(state))
    const [menuList, setMenuList] = useState<any>(null)
    const [invisibleLength, setInvisibleLength] = useState(0)

    let button = document.getElementById('menu-toggler');

    function btnClick() {
        document.querySelector('#m')?.classList.toggle('menu--open');
    }
    useEffect(() => {
        window.addEventListener('resize', restart);
        return () => window.removeEventListener('resize', restart);
    })
    useEffect(() => {
        moveForward()
    }, [])

    function moveForward() {
        let listElements = Array.from(document.querySelectorAll('.el')),
            invisibleElements = getInvisible(listElements),
            mList: any = document.getElementById('menu-list');
        setInvisibleLength(invisibleElements.length)
        invisibleElements?.forEach(function (item: any) {
            mList?.appendChild(item);
        })
        setMenuList(invisibleElements)
    }

    function moveBackward() {
        let menuListElements = Array.from(document.querySelectorAll('#menu-list .el')),
            list: any = document.getElementById('list');

        menuListElements.forEach(function (item) {
            list?.appendChild(item);
        });
    }

    function restart() {
        moveBackward();
        moveForward();
    }


    function getInvisible(listElements: any) {
        let list: any = document.getElementById('list');
        return listElements.filter(function (item: any) {
            if (item.getBoundingClientRect().left + item.getBoundingClientRect().width > list?.clientWidth) {
                return item;
            }
        })
    }

    return (
        <NavBarWrapper invisibleLength={invisibleLength}>
            <div id={'list'}>
                {
                    categories.map((item: any) => <Link className={'el'} key={item.id} to={`articles/${item.id}`}>
                        <NavBarElement>
                            {item.title}
                        </NavBarElement>
                    </Link>)
                }
            </div>
            <span>
                {
                    menuList?.length
                        ? <NavBarElement onClick={btnClick} id="menu-toggler">
                            <img src={drop} alt="drop"/>
                        </NavBarElement>
                        : null
                }
                {/*<NavBarElement onClick={btnClick} id="menu-toggler">*/}
                {/*    <img src={drop} alt="drop"/>*/}
                {/*</NavBarElement>*/}
                <div className={css.menu} id={'m'}>
                    <div id="menu-list">

                    </div>
                </div>
            </span>
        </NavBarWrapper>
    )
}


export default NavBar
