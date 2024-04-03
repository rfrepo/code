package tests.units
{
	
	import asunit.framework.Test;
	import asunit.framework.TestCase;
	
	import vo.data.TrimVO;
	
	import parsers.AbstractParser;
	import parsers.TrimParser;
	
	import tests.ConfiguratorData;
	import parsers.AccessoriesParser;
	
	public class AccessoriesParser_has_a_valid_data_structure extends TestCase implements Test
	{		
		private var allVOs:Vector.<Object>;		
		
		private const BODY_STYLE:String = "bodyStyle";
		private const GRADE:String = "grade";
		private const ENGINE:String = "engine";
		private const PRICE:String = "price";

		private var accessoriesParser:AccessoriesParser;
		
		public function AccessoriesParser_has_a_valid_data_structure(testMethod:String=null)
		{
			super(testMethod);				
		}		
		
		override protected function setUp():void
		{
			accessoriesParser = new AccessoriesParser();
			accessoriesParser.parserData( ConfiguratorData.data );		
			
			allVOs = accessoriesParser.allVOs;
		};
				
		override protected function tearDown():void
		{
			allVOs = null;
		};
		
		public function test_number_of_all_trims_is_as_expected():void
		{
			assertEquals(11,allVOs.length);
		};
		
		
		public function test_accessories_have_availability_data_structure():void
		{			
			assertEquals( getFirstPreconditionType(), GRADE);			
			assertEquals( getSecondPreconditionType(), ENGINE);			
		};	
			
			private function getFirstPreconditionType():String
			{
				return allVOs[0].dependencies.availability[0].type;
			};
			
			private function getSecondPreconditionType():String
			{
				return allVOs[0].dependencies.availability[0].preconditions[0].type;
			};
			
			private function getThirdPreconditionType():String
			{
				return allVOs[0].dependencies.availability[0].precondition[0].precondition[0].type;
			};					
	};
};