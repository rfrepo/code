package tests.units
{
	
	import asunit.framework.Test;
	import asunit.framework.TestCase;
	
	import vo.data.BaseVehicleVO;
	
	import parsers.BaseVehicleParser;
	
	import tests.ConfiguratorData;
	
	public class BaseVehicleParser_has_a_valid_data_structure extends TestCase implements Test
	{		
		private var baseVehicleVOs:Vector.<BaseVehicleVO>;
		
		public function BaseVehicleParser_has_a_valid_data_structure(testMethod:String=null)
		{
			super(testMethod);
		}
		
		override protected function setUp():void
		{
			var baseVehicleParser:BaseVehicleParser = new BaseVehicleParser();
			baseVehicleParser.parserData( ConfiguratorData.data );		
			
			baseVehicleVOs = baseVehicleParser.baseVehicleVOs;
		};
				
		override protected function tearDown():void
		{
			baseVehicleVOs = null;
		};
		
		public function test_number_of_vehicles_is_as_expected():void
		{
			assertEquals(baseVehicleVOs.length, 56);
		};
		
		public function test_engineId_has_no_appended_ids():void
		{
			var engineId:String = baseVehicleVOs[0].engineId;	
			assertTrue( hasNoBodyStyleGradeAppended( engineId ) );
		};
		
		private function hasNoBodyStyleGradeAppended( value:String ):Boolean
		{
			 var indexValue:int = 
				 value.indexOf("_2200") + value.indexOf("_5500") 
				 + value.indexOf("_001") + value.indexOf("_002") + value.indexOf("_003");
			
			 return Boolean( indexValue < -1 )
		}
		
		public function test_optionPackIds_have_no_appended_ids():void
		{
			var optionPackId:String = baseVehicleVOs[1].optionPackIds[0];
			var hasUndescore:Boolean = optionPackId.indexOf("_") == -1;	
			trace(optionPackId);
			assertTrue( hasNoBodyStyleGradeAppended( optionPackId ));
		};
		
		/*
		public function testDataIsTheRequiredStructure():void
		{
			var secondWheelPreconditionType:Object = wheelParser.wheelData;			
			
			assertEquals( getFirstWheelId(), "WHE_01");
			assertEquals( getFirstWheelAvailabilityRootElementType(), "grade");
			
		};	
			
			private function getFirstWheelId():String
			{
				//return wheelParser.wheelData.wheel[0].id;
			};
			
			private function getFirstWheelAvailabilityRootElementType():String
			{
				//return wheelParser.wheelData.wheel[0].availability[0].type;
			};		*/
	};
};