import { createBrowserRouter } from 'react-router-dom'


import Activities from "./Dashboard/Activities/Activities"
import DashbordLayout from "./Dashboard/DashboardLayout/DashbordLayout"
import Cattles from "./Dashboard/cattles/Cattles"
import HomeLayout from "./layouts/HomeLayout"
import Contact from "./pages/Contact"
import Signup from "./pages/Signup"
import Financial from './Dashboard/Financial/Financial'
import Profile from './Dashboard/Profile/Profile'
import Report from './Dashboard/Report/Report'
import App from './App'
import CattleDetail from './Dashboard/cattles/CattleDetail'
import CattleEdit from './Dashboard/cattles/CattleEdit'
import CattleAdd from './Dashboard/cattles/CattleAdd'
import Treatment from './Dashboard/Treatment/treatment'
import Sale from './Dashboard/Sale/Sale'
// import PastureReport from './Dashboard/Report/PastureReport/PastureReport'
import YearingReport from './Dashboard/Report/YearingReport/YearingReport'
import BreedingReport from './Dashboard/Report/BreedingReport/BreedingReport'
// import CalvingReport from './Dashboard/Report/DeadReport/CalvingReport'
import PregnancyReport from './Dashboard/Report/PregnancyReport/PregnancyReport'
import TreatmentReport from './Dashboard/Report/TreatmentReport/TreatmentReport'
import CastrationReport from './Dashboard/Report/CastrationReport/CastrationReport'
import Bull from './Dashboard/Report/Bull/Bull'
import Login from './pages/Login'
import Weight from './Dashboard/Breeding/Breeding'
import Castration from './Dashboard/Castration/Castration'

import NotFound from './layouts/NotFound'
import Users from './Dashboard/users/Users'
import Weaning from './Dashboard/Weaning/Weaning'
import NewBirth from './Dashboard/Weaning/NewBirth'
import DeadActivity from './Dashboard/Weaning/DeadActivity'
import PromoteTobull from './Dashboard/Weaning/PromoteTobull'
import PreginacyCheck from './Dashboard/Weaning/PreginacyCheck'
import History from './Dashboard/History/History'
import Pasture from './Dashboard/cattles/Pasture'
import Group from './Dashboard/cattles/Group'
import PastureAdd from './Dashboard/cattles/PastureAdd'
import AddFinancial from './Dashboard/Financial/AddFinancial'
import SaleReport from './Dashboard/Report/TreatmentReport/SaleReport'
import WeaningReport from './Dashboard/Report/WeaningRep/WeaningReport'
import PastureEdit from './Dashboard/cattles/PastureEdit'
import PastureReport from './Dashboard/Report/PastureReport/PastureReport'
import DeadReport from './Dashboard/Report/DeadReport/DeadReport'
import NewBirthReport from './Dashboard/Report/NewBirthReport/NewBirthReport'
import Changepwd from './Dashboard/Profile/Changepwd'
import PasswordReset from './pages/PasswordReset'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: "/",
                element: <App />
            },
            {
                path: '/contact',
                element: <Contact />
            }
            ,

        ]
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/password/reset',
        element: <PasswordReset />
    },

    {
        path: '/admin',
        element: <DashbordLayout />,
        children: [
            {
                path: '/admin',
                element: <Cattles />
            },
            {
                path: '/admin/cattles',
                element: <Cattles />
            },
            {
                path: '/admin/cattle/:earTag',
                element: <CattleDetail />
            },
            {
                path: '/admin/edit-cow/:earTag',
                element: <CattleEdit />
            },
            {
                path: '/admin/cattle/add',
                element: <CattleAdd />
            },
            {
                path: '/admin/activities',
                element: <Activities />
            },
            {
                path: '/admin/users',
                element: <Users />
            },
            {
                path: '/admin/History',
                element: <History />
            },
            {
                path: '/admin/group',
                element: <Group />
            },
            {
                path: '/admin/pasture',
                element: <Pasture />
            },
            {
                path: '/admin/pasture-add',
                element: <PastureAdd />
            },
            {
                path: '/admin/pasture-edit/:_id',
                element: <PastureEdit />
            },
            {
                path: '/admin/financial',
                element: <Financial />
            },
            {
                path: '/admin/financial/addfinancial',
                element: <AddFinancial />
            },
            {
                path: '/admin/report',
                element: <Report />
            },
            {
                path: '/admin/contact',
                element: <Contact />
            },
            {
                path: '/admin/profile',
                element: <Profile />
            },
            {
                path: '/admin/activities/treatment',
                element: <Treatment />
            },
            {
                path: '/admin/activities/sale',
                element: <Sale />
            },
            {
                path: '/admin/activities/breeding',
                element: <Weight />
            },

            {
                path: '/admin/activities/weaning',
                element: <Weaning />
            },

            {
                path: '/admin/activities/castration',
                element: <Castration />
            },
            {
                path: '/admin/activities/new-birth',
                element: <NewBirth />
            },
            {
                path: '/admin/activities/dead-activity',
                element: <DeadActivity />
            },
            {
                path: '/admin/activities/pregnancy-check',
                element: <PreginacyCheck />
            },
            {
                path: '/admin/activities/promote-tobull',
                element: <PromoteTobull />
            },
            {
                path: '/admin/report',
                element: <Report />
            },
            {
                path: '/admin/report/pasture',
                element: <PastureReport/>
            },
            {
                path: '/admin/report/sale',
                element: <SaleReport />
            },
            {
                path: '/admin/report/treatment',
                element: <TreatmentReport />
            },
            {
                path: '/admin/report/weaning',
                element: <WeaningReport />
            },
            {
                path: '/admin/report/castration',
                element: <CastrationReport />
            },
            {
                path: '/admin/report/yearing',
                element: <YearingReport />
            },
            {
                path: '/admin/report/breeding',
                element: <BreedingReport />
            },
            {
                path: '/admin/report/pregnancy',
                element: <PregnancyReport />
            },
            {
                path: '/admin/report/dead-Report',
                element: <DeadReport />
            },
            {
                path: '/admin/report/new-birth',
                element: <NewBirthReport/>
            },
            {
                path: '/admin/report/cows',
                element: <Bull />
            },
            {
                path:'/admin/change-pwd',
                element:<Changepwd/>
            }
          



        ],

    },
    {
        path: '*',
        element: <NotFound />
    },

])

export default router