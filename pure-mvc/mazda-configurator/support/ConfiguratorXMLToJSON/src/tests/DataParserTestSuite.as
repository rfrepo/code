package tests
{
	import asunit.framework.TestSuite;
	
	import tests.units.AccessoriesParser_has_a_valid_data_structure;
	import tests.units.BaseVehicleParser_has_a_valid_data_structure;
	import tests.units.BodyStyleParser_has_a_valid_data_structure;
	import tests.units.ColoursParser_has_a_valid_data_structure;
	import tests.units.GradeParser_has_a_valid_data_structure;
	import tests.units.OptionPackParser_has_a_valid_data_structure;
	import tests.units.TrimParser_has_a_valid_data_structure;
	import tests.units.WheelParser_has_a_valid_data_structure;
	
	public class DataParserTestSuite extends TestSuite
	{
		
		public function DataParserTestSuite()
		{
			super();			
			createTests();		
		};
		
		private function createTests():void
		{		
			addTest( new BaseVehicleParser_has_a_valid_data_structure() );			
			addTest( new OptionPackParser_has_a_valid_data_structure() );	
			addTest( new TrimParser_has_a_valid_data_structure() );
			addTest( new AccessoriesParser_has_a_valid_data_structure() );			
			addTest( new ColoursParser_has_a_valid_data_structure() );			
			addTest( new WheelParser_has_a_valid_data_structure() );			
			addTest( new GradeParser_has_a_valid_data_structure() );			
			addTest( new BodyStyleParser_has_a_valid_data_structure() );
			
		};
	};
};