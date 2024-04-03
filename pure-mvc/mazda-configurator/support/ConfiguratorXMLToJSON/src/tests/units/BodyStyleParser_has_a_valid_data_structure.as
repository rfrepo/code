package tests.units
{	
	import asunit.framework.Test;
	import asunit.framework.TestCase;
	
	import parsers.AbstractParser;
	import parsers.BodyStyleParser;
	
	import tests.ConfiguratorData;
	
	public class BodyStyleParser_has_a_valid_data_structure extends TestCase implements Test
	{		
		private var allVOs:Vector.<Object>;		
				
		private const GRADE:String = "grade";
		
		private var bodyStyleParser:AbstractParser;
		
		public function BodyStyleParser_has_a_valid_data_structure(testMethod:String=null)
		{
			super(testMethod);				
		}		
		
		override protected function setUp():void
		{
			bodyStyleParser = new BodyStyleParser();
			bodyStyleParser.parserData( ConfiguratorData.data );
			
			allVOs = bodyStyleParser.allVOs;
		};
				
		override protected function tearDown():void
		{
			allVOs = null;
		};
		
		public function test_number_of_grades_is_as_expected():void
		{
			assertEquals( 2, allVOs.length);
		};		
		
		public function test_grades_have_availability_data_structure():void
		{			
			assertEquals( getFirstPreconditionType(), GRADE);				
		};	
			
			private function getFirstPreconditionType():String
			{
				return allVOs[0].dependencies.availability[0].type;
			};				
	};
};