import Footer from './components/Footer'
import {Route} from "react-router-dom";
import classNames from 'classnames';
import './App.scss';

const App = () => {

    const layoutContainerClassName = classNames('layout-container', {
        'layout-menu-horizontal': true,
        'layout-menu-active': false,
        'layout-top-medium': true,
        'p-input-filled': false,
        'p-ripple-disabled': false,
    }, 'layout-topbar-blue', 'layout-menu-light');

    // const routers = [
    //     { path: '/',  label: 'Dashboard', component: Home, exact: true },
    //     { path: '/documentation', label: 'Documentation', component: Documentation },
    //     { path: '/analytics', label: 'Documentation', component: RoleChecker},
    //     { path: '/search/', label: 'Documentation', component: RoleChecker},
    //     // { path: '/search-results/:query', label: 'Documentation', component: SearchResults},
    //     { path: '/role', label: 'Documentation', component: ChooseRole},
    //     { path: '/profile', label: 'Documentation', component: ProfilePage},
    //     { path: '/innovations', label: 'Documentation', component: MyInnovations},
    //     { path: '/descriptors', label: 'Documentation', component: Descriptors},
    //     { path: '/add-innovation', label: 'Documentation', component: AddInnovation},
    //     { path: '/innovation/:id', label: 'Publication' , component: Innovation},
    //     { path: '/detailed-innovation', label: 'Publication' , component: DetailedInnovation},
    //     { path: '/comingsoon', label: 'Coming Soon' , component: Comingsoon}
    // ];

    return (
        <div
            className={layoutContainerClassName}
        >

            <div className="layout-content">
                {/*{*/}
                {/*  routers.map((router, index) => {*/}
                {/*    if (router.exact) {*/}
                {/*      return <Route key={`router${index}`} path={router.path} exact component={router.component} />*/}
                {/*    }*/}

                {/*    return <Route key={`router${index}`} path={router.path} component={router.component} />*/}
                {/*  })*/}
                {/*}*/}
            </div>
            <Footer />
        </div>
    );
}

export default App;
