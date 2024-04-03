package parsers
{
	import vo.data.BaseVehicleVO;

	public class BaseVehicleParser extends AbstractParser
	{
		public var baseVehicleVOs:Vector.<BaseVehicleVO> = new Vector.<BaseVehicleVO>()
			
		public function BaseVehicleParser()
		{
		}
		
		override public function parserData(configuratorXML:XML):void
		{
			var vehicleNode:XML;
			var baseVehicleVO:BaseVehicleVO;					
			
			for each( vehicleNode in configuratorXML..vehicle )
			{
				baseVehicleVO = new BaseVehicleVO();						
				baseVehicleVO.id = vehicleNode.@id;						
				baseVehicleVO.name = vehicleNode.@title;						
				baseVehicleVO.rank = int( vehicleNode.@rank );						
				baseVehicleVO.bodyStyleId = vehicleNode.@bodystyle;						
				baseVehicleVO.engineId = removeBodyStyleSeriesIds(vehicleNode.@engine);						
				baseVehicleVO.standardFeaturesIds = createStringVector( vehicleNode.@option );						
				baseVehicleVO.optionPackIds = createStringVector( removeBodyStyleSeriesIds(vehicleNode.@optionPack) );
				baseVehicleVO.keyCriteria = createStringVector( vehicleNode.@keyCriteria ); 					
				baseVehicleVO.price = vehicleNode.@price;						
				baseVehicleVO.capCode = vehicleNode.@capCode;		
										
				baseVehicleVOs.push( baseVehicleVO );	
			};
			
			//return baseVehicleVOs
		}
		
		//private function
	}
}