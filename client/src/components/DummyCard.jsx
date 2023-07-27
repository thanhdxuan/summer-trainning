const DummyCard = () => {
   <Box display="flex" alignItems="center">
      <Box display="flex">
         <img
            src="/images/animals_1.svg"
            style={{
               borderRadius: 15,
               display: 'block',
               width: '20%',
            }}
            loading="lazy"
         />
         <Box
            sx={{ my: 1, ml: 4 }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap={2}
         >
            <Box>
               <Box fontSize={{ xs: 15, md: 20 }} fontWeight="bold">
                  Chemistry: The Central Science
               </Box>
               <Box fontSize={{ xs: 10, md: 15 }}>
                  Lorem Ipsum is simply dummynd typesetting industry................
               </Box>
            </Box>
            <Box sx={{ width: '100%' }} fontWeight="bold">
               <Box fontSize={{ xs: 8, md: 10 }}>
                  Completed
                  <LinearProgressWithLabel value={39} />
               </Box >
               <Box fontSize={{ xs: 8, md: 10 }}>
                  Correct Ratio
                  <LinearProgressWithLabel value={80} />
               </Box>
            </Box>
         </Box>
      </Box>
   </Box>
}

export default DummyCard;