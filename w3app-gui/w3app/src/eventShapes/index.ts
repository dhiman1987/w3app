import { EventType } from '../constants/eventTypes';
import WarConflictShape from './WarConflictShape';
import EmpireDynastyShape from './EmpireDynastyShape';
import EraPeriodShape from './EraPeriodShape';
import PoliticalEventShape from './PoliticalEventShape';
import DiscoveryInventionShape from './DiscoveryInventionShape';
import FamousPersonShape from './FamousPersonShape';
import CulturalEventShape from './CulturalEventShape';
import NaturalDisasterShape from './NaturalDisasterShape';
import EconomicEventShape from './EconomicEventShape';
import DefaultShape from './DefaultShape';

export const eventShapeMap: Record<string, React.FC<any>> = {
  [EventType.WAR_CONFLICT]: WarConflictShape,
  [EventType.EMPIRE_DYNASTY]: EmpireDynastyShape,
  [EventType.ERA_PERIOD]: EraPeriodShape,
  [EventType.POLITICAL_EVENT]: PoliticalEventShape,
  [EventType.DISCOVERY_INVENTION]: DiscoveryInventionShape,
  [EventType.FAMOUS_PERSON]: FamousPersonShape,
  [EventType.CULTURAL_EVENT]: CulturalEventShape,
  [EventType.NATURAL_DISASTER]: NaturalDisasterShape,
  [EventType.ECONOMIC_EVENT]: EconomicEventShape,
  default: DefaultShape,
};
