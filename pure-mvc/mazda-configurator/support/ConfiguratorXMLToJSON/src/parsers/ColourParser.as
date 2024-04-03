package parsers
{	
	import vo.ColorVO;

	public class ColourParser extends AbstractParser
	{			
		override public function parserData(configuratorXML:XML):void
		{
			createVOs( configuratorXML );
			groupDuplicateIds();
			condenseAvailabilityForEachGroup();
			removeLegarcyProperties( uniqueVOs );	
		}		
		
		private function createVOs( configuratorXML:XML ):void
		{
			var colourNode:XML;
			var colourVO:ColorVO;					
			
			for each( colourNode in configuratorXML..colour )
			{
				colourVO = new ColorVO();	
				
				colourVO.id = removeBodyStyleSeriesIds( colourNode.@value );
				colourVO.bodyStyle = colourNode.@bodystyle.toString();
				colourVO.grade = super.createStringVector( colourNode.@series.toString() );
				colourVO.taxable = Boolean( colourNode.@taxable == 'true');
				colourVO.price = parsePrice( colourNode.prices );
				colourVO.name = removeBodyStyleSeriesIds( colourNode.title.valueOf() );
				colourVO.imageFileName = colourNode.file.@filename;				
				
				allVOs.push( colourVO );	
				
				addDependecyStructureToVO( colourVO );				
			};			
		};			
		
		override protected function mergeGroupVariantsPreconditionToFirstVO(VOVariants:Array, fistVariant:Object):void
		{
			super.mergeGroupVariantsPreconditionToFirstVO(VOVariants,fistVariant);
			fistVariant.dependencies.price =  
				removeDulicateIdsFromPreconditionsObject( fistVariant.dependencies.price )
				
		}
		
	};
};