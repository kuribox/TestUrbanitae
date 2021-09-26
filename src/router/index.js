import { Route, Switch } from 'react-router-dom';
import HomeContainer from '../containers/Home';
import ListContainer from '../containers/List';
import DetailContainer from '../containers/Detail';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/list" component={ListContainer} />
      <Route path="/detail/:id" component={DetailContainer} />
    </Switch>
  );
}

export default Router;
